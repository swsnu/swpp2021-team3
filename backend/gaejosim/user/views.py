"""user views"""
import json
import secrets
from string import ascii_letters, digits, punctuation

import requests
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse, JsonResponse
from django.db.utils import IntegrityError
from django.views.decorators.http import require_http_methods
from django.contrib.auth.hashers import check_password
from django.core.mail.message import EmailMessage

from report.models import Report
from .models import Summoner, User, MannerPoint

api_default = {
    "region": "https://kr.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-d47f8e2f-c1f6-4ef2-8323-64b461d511b7",  # updated 11/25
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
            name=summoner_name,
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


@require_http_methods(["POST"])
def change_password(request):
    """change password"""
    user = request.user

    if not user.is_authenticated:
        return JsonResponse(
            {"error": "You need to login before accessing my page"}, status=401
        )

    data = json.loads(request.body.decode())

    old_password = data["old_password"]
    new_password = data["new_password"]
    password_confirm = data["password_confirm"]

    is_correct = check_password(old_password, user.password)

    if not is_correct:
        return JsonResponse(
            {"error": "Please enter your old password correctly"}, status=400
        )

    if password_confirm != new_password:
        return JsonResponse(
            {"error": "Please enter password confirm correctly"}, status=400
        )

    user.set_password(new_password)
    user.save()

    return JsonResponse({"message": "You password is changed."}, status=200)


@require_http_methods("POST")
def find_username(request):
    """find username"""
    data = json.loads(request.body.decode())
    email = data["email"]

    user = User.objects.filter(email=email).first()

    if user is not None:
        email_message = EmailMessage(
            "[Gaejosim] Find your ID", user.username, to=[email]
        )
        email_message.send()
        return JsonResponse({"message": "Please check your email."}, status=200)

    return JsonResponse(
        {"error": "Such mail address is not registered in our service."}, status=400
    )


@require_http_methods("POST")
def find_password(request):
    """find password"""
    data = json.loads(request.body.decode())
    email = data["email"]
    username = data["username"]

    user = User.objects.filter(email=email, username=username).first()

    if user is not None:
        temp_password = generate_temp_password()
        user.set_password(temp_password)
        user.save()

        message = (
            f"Your new password is \n--------------\n{temp_password}\n--------------\n"
            "After login, please change your password at mypage/change_password tab."
        )

        email_message = EmailMessage(
            "[Gaejosim] Find your Password", message, to=[email]
        )

        email_message.send()
        return JsonResponse({"message": "Please check your email."}, status=200)

    return JsonResponse(
        {"error": "No registered user who has such username and email address"},
        status=400,
    )


def generate_temp_password():
    """generate temporary password"""
    string_pool = ascii_letters + digits + punctuation

    while True:
        temp_password = "".join(secrets.choice(string_pool) for i in range(10))
        if (
            any(c.islower() for c in temp_password)
            and any(c.isupper() for c in temp_password)
            and sum(c.isdigit() for c in temp_password) >= 2
        ):
            break

    return temp_password


@require_http_methods(["POST"])
def log_out(request):
    """sign out"""
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({"error": "The user is not logged in."}, status=400)

    logout(request)

    return JsonResponse({"message": "Logout Success"}, status=200)


@require_http_methods(["GET"])
def my_page(request):
    """My page with user information and report logs"""
    user = request.user
    if not user.is_authenticated:
        return JsonResponse(
            {"error": "You need to login before accessing my page"}, status=401
        )

    summoner = Summoner.objects.select_related("manner_point").get(user=user)

    reports_by_user = []
    reports_for_user = []

    if summoner:
        reports_by_user = [
            {
                "id": report.id,
                "tag": report.tag,
                "comment": report.comment,
                "reported_summoner": report.reported_summoner.name,
                "evaluation": report.evaluation,
                "apology": bool(report.apology),
            }
            for report in Report.objects.filter(reporting_user=user).order_by("-id")[:5]
        ]

        reports_for_user = [
            {
                "id": report.id,
                "tag": report.tag,
                "comment": report.comment,
                "evaluation": report.evaluation,
                "apology": bool(report.apology),
            }
            for report in Report.objects.filter(reported_summoner=summoner).order_by(
                "-id"
            )[:5]
        ]

    return JsonResponse(
        {
            "user": {
                "username": user.username,
                "email": user.email,
                "summoner_name": user.summoner.name,
                "manner_point": user.summoner.manner_point.point,
            },
            "reports": {
                "reports_for_user": reports_for_user,
                "reports_by_user": reports_by_user,
            },
        },
        status=200,
    )


@require_http_methods(["PUT"])
def update_summoner_name(request):
    """update summoner name"""
    user = request.user
    data = json.loads(request.body.decode())

    if not user.is_authenticated:
        return JsonResponse({"error": "User is not logged in."}, status=401)

    new_summoner_name = data["new_summoner_name"]

    summoner_puuid = user.summoner.summoner_puuid

    summoner_url = (
        f"{api_default['region']}/lol/summoner/v4/summoners"
        + f"/by-puuid/{summoner_puuid}?api_key={api_default['key']}"
    )

    summoner_req = requests.get(summoner_url)
    summoner_info = summoner_req.json()

    if summoner_info["name"] == new_summoner_name:
        user.summoner.name = new_summoner_name
        user.summoner.save()
        return JsonResponse(
            {"message": "Successfully update your summoner name."}, status=200
        )

    return JsonResponse(
        {"error": "This name does not match your current summoner name."}, status=400
    )
