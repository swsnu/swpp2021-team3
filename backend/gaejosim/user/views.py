"""views for user"""
import json

from django.contrib.auth import authenticate, login

from django.views.decorators.csrf import ensure_csrf_cookie

from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed

from django.views.decorators.http import require_http_methods

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
