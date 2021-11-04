"""report views"""
import json
import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods

from .models import Report
from user.models import Summoner

api_default = {
    "asia": "https://asia.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-a6f02b48-c453-4e3e-9938-6a80f77e94f9",
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
def report(request):
    """make a report"""
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({"error": "User is not logged in"}, status=401)

    data = json.loads(request.body.decode())
    name = data['name']
    evaluation = data['evaluation']
    tag = data['tag']
    comment = data['comment']

    if tag is None:
        return JsonResponse({"error": "No tag selected"}, status=400)

    get_reported_summoner_id = (
        f"{api_default['region']}/lol/summoner/v4/summoners"
        + f"/by-name/{name}?api_key={api_default['key']}"
    )
    reported_summoner_req = requests.get(get_reported_summoner_id)

    if reported_summoner_req.status_code != 200:
        return JsonResponse({"error": "Such summoner does not exist."}, status=400)

    reported_summoner_id = reported_summoner_req.json()["id"]
    reported_summoner, _ = Summoner.objects.get_or_create(
        summoner_id=reported_summoner_id)

    report = Report(tag=tag, comment=comment,
                    reported_summoner=reported_summoner,
                    reporting_user=user,
                    evaluation=evaluation)

    report.save()

    return JsonResponse({
        "id": report.id,
        "tag": report.tag,
        "comment": report.comment,
        "reported_summoner": name,
        "evaluation": report.evaluation
    }, status=201)
