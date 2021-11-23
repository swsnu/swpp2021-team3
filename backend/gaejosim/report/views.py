"""report views"""
import json
from datetime import datetime, timedelta
import requests
from pytz import timezone
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from user.models import Summoner, MannerPoint
from .models import Report

api_default = {
    "region": "https://kr.api.riotgames.com",
    "asia": "https://asia.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-9c8c097c-d1ef-4751-be48-eab86b791b2b",  # updated 11/22
}

tag_dict = {
    "tag1_1": 1,
    "tag1_2": 1,
    "tag2_1": 2,
    "tag2_2": 2,
    "tag3_1": 3,
    "tag3_2": 3,
    "tag4_1": 4,
    "tag4_2": 4,
    "tag5_1": 5,
    "tag5_2": 5,
}


@require_http_methods(["GET", "POST"])
def report_authentication(request):
    """report authentication"""
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "User is not logged in"}, status=401)

    recent_matches_list = get_recent_matches(user)

    recent_10_game_players = []

    for match_id in recent_matches_list:
        recent_10_game_players += get_team_players(user, match_id)

    if request.method == "POST":

        data = json.loads(request.body.decode())
        summoner_name = data["summoner_name"]

        played = bool(summoner_name in recent_10_game_players)

        return JsonResponse({"authenticated": played})

    return JsonResponse({"recent_players": recent_10_game_players}, status=200)


def get_recent_matches(user):
    """get recent 10 matches id"""
    recent_matches_url = (
        f"{api_default['asia']}/lol/match/v5/matches/by-puuid/"
        + f"{user.summoner.summoner_puuid}/ids?start=0&count=10&api_key={api_default['key']}"
    )
    recent_matches_req = requests.get(recent_matches_url)
    recent_matches_list = recent_matches_req.json()

    return recent_matches_list


def get_team_players(user, match_id):
    """get five players list in the same team"""
    match_url = (
        f"{api_default['asia']}/lol/match/v5/matches/"
        + f"{match_id}?api_key={api_default['key']}"
    )
    match_participants = requests.get(match_url).json()["info"]["participants"]

    team_100 = []
    team_200 = []
    user_team = None

    for i in range(1, 10):
        participant = match_participants[i]

        if match_participants[i]["summonerId"] == user.summoner.summoner_id:
            user_team = match_participants[i]["teamId"]

        elif participant["teamId"] == 100:
            team_100.append(match_participants[i]["summonerName"])

        else:
            team_200.append(match_participants[i]["summonerName"])

    if user_team == 100:
        return team_100
    return team_200


@require_http_methods(["POST"])
def post_report(request):
    """make a report"""
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({"error": "User is not logged in"}, status=401)

    data = json.loads(request.body.decode())
    name = data["name"]
    evaluation = data["evaluation"]
    tag = data["tag"]
    comment = data["comment"]

    if tag is None or not tag:
        return JsonResponse({"error": "No tag selected"}, status=400)

    get_reported_summoner_id = (
        f"{api_default['region']}/lol/summoner/v4/summoners"
        + f"/by-name/{name}?api_key={api_default['key']}"
    )
    reported_summoner_req = requests.get(get_reported_summoner_id)

    if reported_summoner_req.status_code != 200:
        return JsonResponse({"error": "Such summoner does not exist."}, status=400)

    reported_summoner_json = reported_summoner_req.json()
    reported_summoner_id = reported_summoner_json["id"]
    reported_summoner_puuid = reported_summoner_json["puuid"]

    if Summoner.objects.filter(summoner_puuid=reported_summoner_puuid).exists():
        reported_summoner = Summoner.objects.get(summoner_puuid=reported_summoner_puuid)
    else:
        reported_manner_point = MannerPoint.objects.create()
        reported_summoner = Summoner.objects.create(
            name=name,
            summoner_id=reported_summoner_id,
            summoner_puuid=reported_summoner_puuid,
            manner_point=reported_manner_point,
        )

    report = Report.objects.create(
        tag=tag,
        comment=comment,
        reported_summoner=reported_summoner,
        reporting_user=user,
        evaluation=evaluation,
    )

    # apply to manner point
    manner_point = reported_summoner.manner_point
    reports_cnt = Report.objects.filter(reported_summoner=reported_summoner).count()
    manner_point.point = (manner_point.point * reports_cnt + evaluation) / (
        reports_cnt + 1
    )

    tag_list = tag.split(",")
    for tag_key in tag_list:
        if tag_dict[tag_key] == 1:
            manner_point.tag1 -= 1
        elif tag_dict[tag_key] == 2:
            manner_point.tag2 -= 1
        elif tag_dict[tag_key] == 3:
            manner_point.tag3 -= 1
        elif tag_dict[tag_key] == 4:
            manner_point.tag4 -= 1
        else:
            manner_point.tag5 -= 1

    manner_point.save()

    return JsonResponse(
        {
            "id": report.id,
            "tag": report.tag,
            "comment": report.comment,
            "reported_summoner": name,
            "evaluation": report.evaluation,
        },
        status=201,
    )


@require_http_methods(["GET"])
def my_reports(request):
    """list of my reports"""
    user = request.user

    if not user.is_authenticated:
        return JsonResponse(
            {"error": "You need to login before accessing my page"}, status=401
        )

    reports = [
        {
            "id": report.id,
            "tag": report.tag,
            "comment": report.comment,
            "reported_summoner": report.reported_summoner.name,
            "evaluation": report.evaluation,
        }
        for report in Report.objects.filter(reporting_user=user)
    ]

    return JsonResponse({"reports": reports}, status=200)


@require_http_methods(["GET"])
def reports_statistics(request):
    """total reports statistics"""
    today = datetime.now(timezone("Asia/Seoul"))
    yesterday = today + timedelta(days=-1)
    tomorrow = today + timedelta(days=1)
    reports = Report.objects.all()

    total_report_num = reports.count()
    today_report_num = Report.objects.filter(
        created_at__range=(yesterday, tomorrow)
    ).count()

    return JsonResponse(
        {"accumulated_reports": total_report_num, "today_reports": today_report_num},
        status=200,
    )
