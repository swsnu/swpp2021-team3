import json
import requests

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.contrib.auth.hashers import check_password
from django.db.utils import IntegrityError

from .models import Summoner, User

api_default = {
    'region' : 'https://kr.api.riotgames.com', # korea server
    'key' : 'RGAPI-ccb716a9-d0a3-476d-8d4c-b8a37a381628' # api key : needs to regenerate every 24hr
}

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

def sign_up(request):
    if request.method =='POST':
        data = json.loads(request.body.decode())
        username = data['username']
        email = data['email']
        summoner_name = data['summoner_name']
        password = data['password']

        validation_url = F"{api_default['region']}/lol/summoner/v4/summoners/by-name/{summoner_name}?api_key={api_default['key']}"
        validation_req = requests.get(validation_url)
        is_summoner = (validation_req.status_code == 200)

        if is_summoner:
            summoner_info = validation_req.json()
            summoner_id = summoner_info['puuid']
            summoner, is_created = Summoner.objects.get_or_create(summoner_id = summoner_id)

            exist = User.objects.filter(summoner = summoner).exists()

            if exist:
                return JsonResponse(
                {
                    "error" : "This summoner is already registered in our service"
                }, status=400
            )
            
            try:
                user = User.objects.create_user(
                    username = username,
                    email = email,
                    password = password,
                    summoner = summoner
                )

            except(IntegrityError) as e:
                if 'username' in str(e):
                    return JsonResponse(
                    {
                        "error" : "This username already exists."
                    }, status=400
                )

                if 'email' in str(e):
                    return JsonResponse(
                    {
                        "error" : "This email already exists."
                    }, status=400
                )

            return JsonResponse({"message" : "User is created!"}, status=201)


        else:
            return JsonResponse(
                {
                    "error" : "This summoner name is invalid"
                }, status=400
            )
        
    else:
        HttpResponseNotAllowed(['POST'])
        