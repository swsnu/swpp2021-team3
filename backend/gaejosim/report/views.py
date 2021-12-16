"""report views"""
import json
from datetime import datetime, timedelta
import requests
from pytz import timezone
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.cache import cache
from core.ml import papago_translate, watson_nlu_emotion
from core.utils import is_riot_timeout, check_logged_in
from user.models import Summoner, MannerPoint
from .models import Apology, Report

api_default = {
    "region": "https://kr.api.riotgames.com",
    "asia": "https://asia.api.riotgames.com",  # korea server
    # api key : needs to regenerate every 24hr
    "key": "RGAPI-400de67a-cf0c-4ca4-93a9-0fafb827231f",  # updated 12/16
}

tag_dict = {
    "과격한 언행": 1,
    "비속어 사용": 1,
    "고의성 던짐": 2,
    "탈주/닷지": 2,
    "대리 게임": 3,
    "픽 상황 갑질": 3,
    "cs 스틸": 4,
    "팀킬": 4,
    "정치": 5,
    "라인 거부": 5,
}


@check_logged_in
@require_http_methods(["GET", "POST"])
def report_authentication(request):
    """report authentication"""
    user = request.user

    recent_matches_list = get_recent_matches(user)

    recent_10_game_players = []

    for match_id in recent_matches_list:
        team_players = get_team_players(user, match_id)
        if not team_players:
            JsonResponse(
                {"error": "RIOT API 호출 시간초과입니다. 잠시 뒤에 다시 시도하세요."}, status=400)
        recent_10_game_players += team_players

    if request.method == "POST":

        data = json.loads(request.body.decode())
        summoner_name = data["summoner_name"]

        played = bool(summoner_name in recent_10_game_players)

        return JsonResponse({"authenticated": played})

    return JsonResponse({"recent_players": recent_10_game_players}, status=200)


def get_recent_matches(user):
    """get recent 10 matches id"""
    recent_matches_url = (
        f"{api_default['asia']}/lol/match/v5/matches/by-puuid/{user.summoner.summoner_puuid}/"
        + f"ids?start=0&count=10&api_key={api_default['key']}"
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

    match_result = requests.get(match_url).json()

    if is_riot_timeout(match_result):
        return None

    match_participants = match_result["info"]["participants"]

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
@check_logged_in
def post_report(request):
    """make a report"""
    user = request.user

    data = json.loads(request.body.decode())
    name = data["name"]
    evaluation = data["evaluation"]
    tag = data["tag"]
    comment = data["comment"]

    if tag is None or not tag:
        return JsonResponse({"error": "태그가 선택되지 않았습니다."}, status=400)

    get_reported_summoner_id = (
        f"{api_default['region']}/lol/summoner/v4/summoners"
        + f"/by-name/{name}?api_key={api_default['key']}"
    )
    reported_summoner_req = requests.get(get_reported_summoner_id)

    if reported_summoner_req.status_code != 200:
        return JsonResponse({"error": "해당 소환사가 존재하지 않습니다."}, status=400)
    if is_riot_timeout(reported_summoner_req.json()):
        return JsonResponse(
            {"error": "RIOT API 호출 시간초과입니다. 잠시 뒤에 다시 시도하세요."}, status=429
        )

    reported_summoner_json = reported_summoner_req.json()
    reported_summoner_id = reported_summoner_json["id"]
    reported_summoner_puuid = reported_summoner_json["puuid"]

    if Summoner.objects.filter(summoner_puuid=reported_summoner_puuid).exists():
        reported_summoner = Summoner.objects.select_related("manner_point").get(
            summoner_puuid=reported_summoner_puuid
        )

    else:
        reported_manner_point = MannerPoint.objects.create()
        reported_summoner = Summoner.objects.create(
            name=name,
            summoner_id=reported_summoner_id,
            summoner_puuid=reported_summoner_puuid,
            manner_point=reported_manner_point,
        )

    report = Report.objects.create(
        tag=tag,
        comment=comment,
        reported_summoner=reported_summoner,
        reporting_user=user,
        evaluation=evaluation,
    )

    # apply to manner point
    manner_point = reported_summoner.manner_point
    reports_cnt = Report.objects.filter(
        reported_summoner=reported_summoner).count()

    manner_point.point = (manner_point.point * reports_cnt + evaluation) / (
        reports_cnt + 1
    )

    tag_list = tag.split(",")
    for tag_key in tag_list:
        if tag_dict[tag_key] == 1:
            manner_point.tag1 -= 0.5
        elif tag_dict[tag_key] == 2:
            manner_point.tag2 -= 0.5
        elif tag_dict[tag_key] == 3:
            manner_point.tag3 -= 0.5
        elif tag_dict[tag_key] == 4:
            manner_point.tag4 -= 0.5
        else:
            manner_point.tag5 -= 0.5

    manner_point.save()

    return JsonResponse(
        {
            "id": report.id,
            "tag": report.tag,
            "comment": report.comment,
            "reported_summoner": name,
            "evaluation": report.evaluation,
        },
        status=201,
    )


@check_logged_in
@require_http_methods(["GET"])
def my_reports(request):
    """list of my reports"""
    user = request.user

    reports = [
        {
            "id": report.id,
            "tag": report.tag,
            "comment": report.comment,
            "reported_summoner": report.reported_summoner.name,
            "evaluation": report.evaluation,
            "apology": bool(report.apology),
        }
        for report in Report.objects.filter(reporting_user=user)
    ]

    return JsonResponse({"reports": reports}, status=200)


@check_logged_in
@require_http_methods(["GET"])
def my_received_reports(request):
    """list of reports I've got"""
    user = request.user

    reports = [
        {
            "id": report.id,
            "tag": report.tag,
            "comment": report.comment,
            "evaluation": report.evaluation,
            "apology": bool(report.apology),
        }
        for report in Report.objects.filter(reported_summoner=user.summoner)
    ]

    return JsonResponse({"reports": reports}, status=200)


@require_http_methods(["GET"])
def reports_statistics(request):
    """total reports statistics"""
    today = datetime.now(timezone("Asia/Seoul"))
    yesterday = today + timedelta(days=-1)
    tomorrow = today + timedelta(days=1)

    total_report_num = cache.get("total_report_num")
    if not total_report_num:
        total_report_num = Report.objects.count()
        cache.set("total_report_num", total_report_num, 60)

    today_report_num = cache.get("today_report_num")
    if not today_report_num:
        today_report_num = Report.objects.filter(
            created_at__range=(yesterday, tomorrow)
        ).count()
        cache.set("today_report_num", today_report_num, 60)

    user = request.user
    reports_list = []

    if user.is_authenticated:
        if user.summoner:
            reports_list = Report.objects.filter(
                reported_summoner=user.summoner
            ).exclude(apology__isnull=False)

    return JsonResponse(
        {
            "accumulated_reports": total_report_num,
            "today_reports": today_report_num,
            "not_answered_reports": len(reports_list),
        },
        status=200,
    )


@check_logged_in
@require_http_methods(["GET", "POST", "PUT"])
def apology(request, report_id):
    """get, post, put an apology"""
    user = request.user

    try:
        report = Report.objects.get(id=report_id)
    except Report.DoesNotExist:
        return JsonResponse({"error": "해당 신고가 존재하지 않습니다."}, status=404)

    if request.method == "POST":
        if user.summoner != report.reported_summoner:
            return JsonResponse(
                {"error": "해당 신고에 대한 반성문 작성 권한이 없습니다."},
                status=401,
            )

        if report.apology:
            return JsonResponse({"error": "이미 해당 신고에 대한 반성문을 작성했습니다."}, status=400)

        req_data = json.loads(request.body.decode())
        content = req_data["content"]

        if len(content) == 0:
            return JsonResponse({"error": "내용을 입력해주세요."}, status=400)

        translated_content = papago_translate(content)

        passed = watson_nlu_emotion(translated_content)

        if not passed:
            return JsonResponse(
                {
                    "error": "반성의 마음을 담아 다시 작성해주세요."
                },
                status=400,
            )

        apology = Apology(content=content, is_verified=True)
        apology.save()
        report.apology = apology
        report.save()

        report_tag_list = report.tag.split(",")
        report_evaluation = report.evaluation

        manner_point = user.summoner.manner_point

        for tag_key in report_tag_list:
            if tag_dict[tag_key] == 1:
                manner_point.tag1 += 0.5
            elif tag_dict[tag_key] == 2:
                manner_point.tag2 += 0.5
            elif tag_dict[tag_key] == 3:
                manner_point.tag3 += 0.5
            elif tag_dict[tag_key] == 4:
                manner_point.tag4 += 0.5
            else:
                manner_point.tag5 += 0.5

        reports_cnt = Report.objects.filter(
            reported_summoner=user.summoner).count()

        if reports_cnt == 1:
            manner_point.point = 80
        else:
            manner_point.point = (
                manner_point.point * reports_cnt - report_evaluation
            ) / (reports_cnt - 1)
        manner_point.save()

        return JsonResponse(
            {
                "id": apology.id,
                "content": apology.content,
                "is_verified": apology.is_verified,
                "report_id": report.id,
            },
            status=201,
        )

    if request.method == "PUT":
        if user.summoner != report.reported_summoner:
            return JsonResponse(
                {"error": "해당 신고에 대한 반성문 작성 권한이 없습니다."},
                status=401,
            )

        if not report.apology:
            return JsonResponse({"error": "아직 해당 신고에 대한 반성문을 작성하지 않았습니다."}, status=404)

        try:
            apology = Apology.objects.get(id=report.apology.id)

        except Apology.DoesNotExist:
            return JsonResponse({"error": "아직 해당 신고에 대한 반성문을 작성하지 않았습니다."}, status=404)
        req_data = json.loads(request.body.decode())
        content = req_data["content"]

        if len(content) == 0:
            return JsonResponse({"error": "내용을 입력해주세요."}, status=400)

        translated_content = papago_translate(content)

        passed = watson_nlu_emotion(translated_content)

        if not passed:
            return JsonResponse(
                {
                    "error": "반성의 마음을 담아 다시 작성해주세요."
                },
                status=400,
            )

        apology.content = content
        apology.is_verified = True
        apology.save()

        return JsonResponse(
            {
                "id": apology.id,
                "content": apology.content,
                "is_verified": apology.is_verified,
                "report_id": report.id,
            },
            status=200,
        )

    if request.method == "GET":
        if not (
            (user.summoner == report.reported_summoner)
            or (user == report.reporting_user)
        ):
            return JsonResponse({"error": "해당 신고에 대한 접근 권한이 없습니다."}, status=401)

        if not report.apology:
            return JsonResponse({"error": "아직 해당 신고에 대한 반성문을 작성하지 않았습니다."}, status=404)

        apology = Apology.objects.get(id=report.apology.id)

        return JsonResponse(
            {
                "id": apology.id,
                "content": apology.content,
                "is_verified": apology.is_verified,
                "report_id": report.id,
            },
            status=200,
        )


@check_logged_in
@require_http_methods(["DELETE"])
def delete_report(request, report_id):
    """delete reportm report"""
    user = request.user

    try:
        report = Report.objects.select_related(
            "reported_summoner").get(id=report_id)

    except Report.DoesNotExist:
        return JsonResponse({"error": "해당 신고가 존재하지 않습니다."}, status=404)

    if report.reporting_user != user:
        return JsonResponse({"error": "작성한 리포트만 삭제할 수 있습니다"}, status=400)

    report_tag_list = report.tag.split(",")
    report_evaluation = report.evaluation

    reported_summoner = report.reported_summoner
    manner_point = reported_summoner.manner_point

    for tag_key in report_tag_list:
        if tag_dict[tag_key] == 1:
            manner_point.tag1 += 0.5
        elif tag_dict[tag_key] == 2:
            manner_point.tag2 += 0.5
        elif tag_dict[tag_key] == 3:
            manner_point.tag3 += 0.5
        elif tag_dict[tag_key] == 4:
            manner_point.tag4 += 0.5
        else:
            manner_point.tag5 += 0.5

    reports_cnt = Report.objects.filter(
        reported_summoner=reported_summoner).count()

    if reports_cnt == 1:
        manner_point.point = 80
    else:
        manner_point.point = (manner_point.point * reports_cnt - report_evaluation) / (
            reports_cnt - 1
        )
    manner_point.save()

    report.delete()

    return JsonResponse({"message": "해당 신고가 삭제되었습니다."}, status=200)
