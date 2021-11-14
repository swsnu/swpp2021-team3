"""user views"""
import json
import requests
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse
from django.db.utils import IntegrityError
from django.views.decorators.http import require_http_methods

from .models import Summoner, User, MannerPoint

api_default = {
    "region": "https://kr.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-c7b1091b-f232-4184-ba59-1eaaf0e5466e",  # updated 11/15 08:40
}


@require_http_methods(["GET"])
@ensure_csrf_cookie
def token(request):
    """set token"""
    return HttpResponse(status=204)


@require_http_methods(["POST"])
def sign_in(request):
    """sign in"""
    data = json.loads(request.body.decode())
    username = data["username"]
    password = data["password"]

    user = authenticate(username=username, password=password)

    if user:
        login(request, user)
        return JsonResponse(
            {
                "message": "login success",
            },
            status=200,
        )

    return JsonResponse({"error": "Wrong username or wrong password"}, status=403)


@require_http_methods(["POST"])
def sign_up(request):
    """sign up"""
    data = json.loads(request.body.decode())
    username = data["username"]
    email = data["email"]
    summoner_name = data["summoner_name"]
    password = data["password"]

    validation_url = (
        f"{api_default['region']}/lol/summoner/v4/summoners"
        + f"/by-name/{summoner_name}?api_key={api_default['key']}"
    )

    validation_req = requests.get(validation_url)

    if not validation_req.status_code == 200:
        return JsonResponse({"error": "This summoner name is invalid"}, status=400)

    summoner_info = validation_req.json()

    summoner_id = summoner_info["id"]
    summoner_puuid = summoner_info["puuid"]

    if Summoner.objects.filter(summoner_puuid=summoner_puuid).exists():
        summoner = Summoner.objects.get(summoner_puuid=summoner_puuid)
    else:
        manner_point = MannerPoint.objects.create()
        summoner = Summoner.objects.create(
            summoner_puuid=summoner_puuid,
            summoner_id=summoner_id,
            manner_point=manner_point,
        )

    exist = User.objects.filter(summoner=summoner).exists()

    if exist:
        return JsonResponse(
            {"error": "This summoner is already registered in our service"}, status=400
        )

    try:
        User.objects.create_user(
            username=username, email=email, password=password, summoner=summoner
        )

    except (IntegrityError) as invalid_input_error:
        if "username" in str(invalid_input_error):
            return JsonResponse({"error": "This username already exists."}, status=400)

        return JsonResponse({"error": "This email already exists."}, status=400)

    return JsonResponse({"message": "User is created!"}, status=201)
