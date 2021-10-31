"""views for user"""
import json
import requests

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.db.utils import IntegrityError

from .models import Summoner, User

api_default = {
    'region' : 'https://kr.api.riotgames.com', # korea server
    'key' : 'RGAPI-ccb716a9-d0a3-476d-8d4c-b8a37a381628' # api key : needs to regenerate every 24hr
}

@ensure_csrf_cookie
def token(request):
    """set token"""
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])

def sign_up(request):
    """sign up"""
    if request.method =='POST':
        data = json.loads(request.body.decode())
        username = data['username']
        email = data['email']
        summoner_name = data['summoner_name']
        password = data['password']

        validation_url = F"{api_default['region']}\
            /lol/summoner/v4/summoners/by-name/{summoner_name}?api_key={api_default['key']}"

        validation_req = requests.get(validation_url)
        is_summoner = (validation_req.status_code == 200)

        if is_summoner:
            summoner_info = validation_req.json()
            summoner_id = summoner_info['puuid']
            summoner, _ = Summoner.objects.get_or_create(summoner_id = summoner_id)

            exist = User.objects.filter(summoner = summoner).exists()

            if exist:
                return JsonResponse(
                {
                    "error" : "This summoner is already registered in our service"
                }, status=400
            )

            try:
                User.objects.create_user(
                    username = username,
                    email = email,
                    password = password,
                    summoner = summoner
                )

            except(IntegrityError) as invalid_input_error:
                if 'username' in str(invalid_input_error):
                    return JsonResponse(
                    {
                        "error" : "This username already exists."
                    }, status=400
                )

                if 'email' in str(invalid_input_error):
                    return JsonResponse(
                    {
                        "error" : "This email already exists."
                    }, status=400
                )

            return JsonResponse({"message" : "User is created!"}, status=201)

        return JsonResponse(
            {
                "error" : "This summoner name is invalid"
            }, status=400
        )

    return HttpResponseNotAllowed(['POST'])
        