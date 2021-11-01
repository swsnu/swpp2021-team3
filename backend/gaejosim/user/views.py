"""views for user"""
import json
import requests

from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.db.utils import IntegrityError

from .models import Summoner, User

api_default = {
    "region": "https://kr.api.riotgames.com",  # korea server
    "key": "RGAPI-670b3502-c473-4867-a9b1-b65f8b21339b",  # api key : needs to regenerate every 24hr
}


@require_http_methods(["GET"])
@ensure_csrf_cookie
def token(request):
    """set token"""
    if request.method == "GET":
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(["GET"])
