"""views for report"""
import json
import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view

api_default = {
    "asia": "https://asia.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-a6f02b48-c453-4e3e-9938-6a80f77e94f9",
}


@ensure_csrf_cookie
@api_view(["GET", "POST"])
def report_authentication(request):
    """/api/reports/auth/"""
    if request.method == "POST":
        return authenticate_team_players(request)
    return get_authenticated_players(request)


def authenticate_team_players(request):
    """report authentication"""
    user = request.user

    if not user.is_authenticated:
        return HttpResponse(status=401)

    recent_matches_list = get_recent_matches(user)

    recent_10_game_players = []

    for match_id in recent_matches_list:
        recent_10_game_players += get_team_players(user, match_id)

    data = request.data
    summoner_name = data["summoner_name"]

    played = bool(summoner_name in recent_10_game_players)

    return JsonResponse({"authenticated": played})


def get_authenticated_players(request):
    """report authentication"""
    user = request.user

    if not user.is_authenticated:
        return HttpResponse(status=401)

    recent_matches_list = get_recent_matches(user)

    recent_10_game_players = []

    for match_id in recent_matches_list:
        recent_10_game_players += get_team_players(user, match_id)

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
