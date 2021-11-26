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
from core.utils import check_logged_in
from .models import Summoner, User, MannerPoint

api_default = {
    "region": "https://kr.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-7fd97294-d6a6-403f-8a8f-5ca33beaa59e",  # updated 11/26
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

    return JsonResponse({"error": "아이디 혹은 비밀번호가 일치하지 않습니다."}, status=403)


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
        return JsonResponse({"error": "해당 이름의 소환사가 존재하지 않습니다."}, status=400)

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
        return JsonResponse({"error": "해당 소환사는 이미 계정이 존재합니다."}, status=400)

    try:
        User.objects.create_user(
            username=username, email=email, password=password, summoner=summoner
        )

    except (IntegrityError) as invalid_input_error:
        if "username" in str(invalid_input_error):
            return JsonResponse({"error": "해당 아이디는 중복된 아이디입니다."}, status=400)

        return JsonResponse({"error": "해당 이메일은 중복된 이메일입니다."}, status=400)

    return JsonResponse({"message": "회원가입이 완료되었습니다."}, status=201)


@check_logged_in
@require_http_methods(["PUT"])
def change_password(request):
    """change password"""
    user = request.user

    data = json.loads(request.body.decode())

    old_password = data["old_password"]
    new_password = data["new_password"]
    password_confirm = data["password_confirm"]

    is_correct = check_password(old_password, user.password)

    if not is_correct:
        return JsonResponse({"error": "기존 비밀번호가 일치하지 않습니다."}, status=400)

    if password_confirm != new_password:
        return JsonResponse({"error": "비밀번호 확인이 일치하지 않습니다."}, status=400)

    user.set_password(new_password)
    user.save()

    return JsonResponse({"message": "비밀번호 변경이 완료되었습니다."}, status=200)


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
        return JsonResponse({"message": "메일함을 확인해주세요."}, status=200)

    return JsonResponse({"error": "해당 이메일을 사용하는 사용자가 존재하지 않습니다."}, status=400)


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
        return JsonResponse({"message": "메일함을 확인해주세요."}, status=200)

    return JsonResponse(
        {"error": "해당 아이디와 이메일로 가입한 사용자가 존재하지 않습니다."},
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


@check_logged_in
@require_http_methods(["POST"])
def log_out(request):
    """sign out"""
    logout(request)

    return JsonResponse({"message": "로그인이 완료되었습니다."}, status=200)


@check_logged_in
@require_http_methods(["GET"])
def my_page(request):
    """My page with user information and report logs"""
    user = request.user

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
                "summoner_name": summoner.name,
                "manner_point": summoner.manner_point.point,
            },
            "reports": {
                "reports_for_user": reports_for_user,
                "reports_by_user": reports_by_user,
            },
        },
        status=200,
    )


@check_logged_in
@require_http_methods(["PUT"])
def update_summoner_name(request):
    """update summoner name"""
    user = request.user
    data = json.loads(request.body.decode())

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
        return JsonResponse({"message": "정보가 업데이트되었습니다."}, status=200)

    return JsonResponse({"error": "소환사 명이 현재 소환사 명과 일치하지 않습니다."}, status=400)
