"""search views"""
import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from user.models import Summoner

api_default = {
    "asia": "https://asia.api.riotgames.com",  # asia server
    "korea": "https://kr.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-1a26dc39-7e67-4e43-b727-c8be836b8078",
}


@require_http_methods(["GET"])
def search(request):
    """single/multi search"""
    search_type = request.GET["type"]
    summoners = request.GET["summoners"]

    if search_type == "":
        return HttpResponse(status=400)
    if summoners == "":
        return HttpResponse(status=400)

    summoners = request.GET["summoners"].split(",")
    multisearch_results = []

    for summoner in summoners:
        summoner_name_url = (
            f"{api_default['korea']}/lol/summoner/v4/summoners/by-name/"
            + f"{summoner}?api_key={api_default['key']}"
        )
        summoner_name_req = requests.get(summoner_name_url)
        if summoner_name_req.status_code == 404:
            multisearch_results.append(
                {
                    "summoner_name": summoner,
                }
            )
            continue
        summoner_puuid = summoner_name_req.json()["puuid"]

        summoner_league_url = (
            f"{api_default['korea']}/lol/league/v4/entries/by-summoner/"
            + f"{summoner_name_req.json()['id']}?api_key={api_default['key']}"
        )
        summoner_league_req = requests.get(summoner_league_url)
        tier = None
        if summoner_league_req.json() != []:
            for league_dto in summoner_league_req.json():
                if league_dto["queueType"] == "RANKED_SOLO_5x5":
                    tier = {"tier": league_dto["tier"], "rank": league_dto["rank"]}
                    break

        matches_by_summoner_url = (
            f"{api_default['asia']}/lol/match/v5/matches/by-puuid/"
            + f"{summoner_puuid}/ids?type=ranked&start=0&count=10&api_key={api_default['key']}"
        )
        matches_by_summoner_req = requests.get(matches_by_summoner_url)
        matches_by_summoner_list = matches_by_summoner_req.json()
        recent_result = []

        for match in matches_by_summoner_list:
            match_metadata_url = (
                f"{api_default['asia']}/lol/match/v5/matches/"
                + f"{match}?api_key={api_default['key']}"
            )
            match_metadata_req = requests.get(match_metadata_url)
            match_metadata = match_metadata_req.json()
            summoner_index = match_metadata["metadata"]["participants"].index(
                summoner_puuid
            )
            summoner_metadata = match_metadata["info"]["participants"][summoner_index]
            recent_result.append(
                {
                    "lane": summoner_metadata["lane"],
                    "kills": summoner_metadata["kills"],
                    "assists": summoner_metadata["assists"],
                    "deaths": summoner_metadata["deaths"],
                    "champion_id": summoner_metadata["championId"],
                    "win": summoner_metadata["win"],
                }
            )
        if Summoner.objects.filter(summoner_puuid=summoner_puuid).exists():
            manner_point = Summoner.objects.get(
                summoner_puuid=summoner_puuid
            ).manner_point.point
        else:
            manner_point = None

        multisearch_results.append(
            {
                "summoner_name": summoner,
                "manner_point": manner_point,
                "tier": tier,
                "recent_result": recent_result,
            }
        )

    return JsonResponse(
        {"matchers": multisearch_results},
        status=200,
        json_dumps_params={"ensure_ascii": False},
    )
