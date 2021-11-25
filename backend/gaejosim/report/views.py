"""report views"""
import json
from datetime import datetime, timedelta
import requests
from pytz import timezone
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from core.utils import is_riot_timeout
from user.models import Summoner, MannerPoint
from .models import Apology, Report

api_default = {
    "region": "https://kr.api.riotgames.com",
    "asia": "https://asia.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-d47f8e2f-c1f6-4ef2-8323-64b461d511b7",  # updated 11/25
}

tag_dict = {
    "과격한 언행": 1,
    "비속어 사용": 1,
    "고의성 던짐": 2,
    "탈주/닷지": 2,
    "대리 게임": 3,
    "픽 상황 갑질": 3,
    "cs 스틸": 4,
    "팀킬": 4,
    "정치": 5,
    "라인 거부": 5,
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
        team_players = get_team_players(user, match_id)
        if not team_players:
            JsonResponse({"error": "RIOT API timeout"}, status=400)
        recent_10_game_players += team_players

    if request.method == "POST":

        data = json.loads(request.body.decode())
        summoner_name = data["summoner_name"]

        played = bool(summoner_name in recent_10_game_players)

        return JsonResponse({"authenticated": played})

    return JsonResponse({"recent_players": recent_10_game_players}, status=200)


def get_recent_matches(user):
    """get recent 10 matches id"""
    recent_matches_url = (
        f"{api_default['asia']}/lol/match/v5/matches/by-puuid/{user.summoner.summoner_puuid}/"
        + f"ids?start=0&count=10&api_key={api_default['key']}"
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

    match_result = requests.get(match_url).json()

    if is_riot_timeout(match_result):
        return None

    match_participants = match_result["info"]["participants"]

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
    if is_riot_timeout(reported_summoner_req.json()):
        return JsonResponse({"error": "RIOT API timeout"}, status=429)

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
            manner_point.tag1 -= 0.5
        elif tag_dict[tag_key] == 2:
            manner_point.tag2 -= 0.5
        elif tag_dict[tag_key] == 3:
            manner_point.tag3 -= 0.5
        elif tag_dict[tag_key] == 4:
            manner_point.tag4 -= 0.5
        else:
            manner_point.tag5 -= 0.5

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
            {"error": "You need to login before accessing this apology."}, status=401
        )

    reports = [
        {
            "id": report.id,
            "tag": report.tag,
            "comment": report.comment,
            "reported_summoner": report.reported_summoner.name,
            "evaluation": report.evaluation,
            "apology": bool(report.apology),
        }
        for report in Report.objects.filter(reporting_user=user)
    ]

    return JsonResponse({"reports": reports}, status=200)


@require_http_methods(["GET"])
def my_received_reports(request):
    """list of reports I've got"""
    user = request.user

    if not user.is_authenticated:
        return JsonResponse(
            {"error": "You need to login before accessing this apology."}, status=401
        )

    reports = [
        {
            "id": report.id,
            "tag": report.tag,
            "comment": report.comment,
            "evaluation": report.evaluation,
            "apology": bool(report.apology),
        }
        for report in Report.objects.filter(reported_summoner=user.summoner)
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

    user = request.user
    reports_list = []

    if user.is_authenticated:
        if user.summoner:
            reports_list = Report.objects.filter(
                reported_summoner=user.summoner
            ).exclude(apology__isnull=False)

    return JsonResponse(
        {
            "accumulated_reports": total_report_num,
            "today_reports": today_report_num,
            "not_answered_reports": len(reports_list),
        },
        status=200,
    )


@require_http_methods(["GET", "POST", "PUT"])
def apology(request, report_id):
    """get, post, put an apology"""
    user = request.user

    if not user.is_authenticated:
        return JsonResponse(
            {"error": "You need to login before accessing this apology."}, status=401
        )

    try:
        report = Report.objects.get(id=report_id)
    except Report.DoesNotExist:
        return JsonResponse({"error": "This report does not exist."}, status=404)

    if request.method == "POST":
        if user.summoner != report.reported_summoner:
            return JsonResponse(
                {"error": "You are not allowed to write an apology to this report."},
                status=401,
            )

        if report.apology:
            return JsonResponse(
                {"error": "You already wrote an apology for this report."}, status=400
            )

        req_data = json.loads(request.body.decode())
        content = req_data["content"]

        apology = Apology(content=content)
        apology.save()
        report.apology = apology
        report.save()

        return JsonResponse(
            {
                "id": apology.id,
                "content": apology.content,
                "is_verified": apology.is_verified,
                "report_id": report.id,
            },
            status=201,
        )

    if request.method == "PUT":
        if user.summoner != report.reported_summoner:
            return JsonResponse(
                {"error": "You are not allowed to write an apology to this report."},
                status=401,
            )

        if not report.apology:
            return JsonResponse(
                {"error": "You haven't written an apology for this report."}, status=404
            )

        try:
            apology = Apology.objects.get(id=report.apology.id)
        except Apology.DoesNotExist:
            return JsonResponse(
                {"error": "This report does not have any apology."}, status=404
            )
        req_data = json.loads(request.body.decode())
        content = req_data["content"]

        apology.content = content
        apology.save()

        return JsonResponse(
            {
                "id": apology.id,
                "content": apology.content,
                "is_verified": apology.is_verified,
                "report_id": report.id,
            },
            status=200,
        )

    if request.method == "GET":
        if not (
            (user.summoner == report.reported_summoner)
            or (user == report.reporting_user)
        ):
            return JsonResponse(
                {"error": "You are not allowed to read this apology."}, status=401
            )

        if not report.apology:
            return JsonResponse(
                {"error": "This report does not have any apology."}, status=404
            )

        apology = Apology.objects.get(id=report.apology.id)

        return JsonResponse(
            {
                "id": apology.id,
                "content": apology.content,
                "is_verified": apology.is_verified,
                "report_id": report.id,
            },
            status=200,
        )
