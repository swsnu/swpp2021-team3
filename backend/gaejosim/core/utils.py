"""Util functions for the service"""
from functools import wraps
from django.http import JsonResponse


def is_json_key_present(json, key):
    """check whether json has the key"""
    try:
        json[key]
    except KeyError:
        return False

    return True


def is_riot_timeout(riot_response):
    """check whether the RIOT response is timed out"""
    if is_json_key_present(riot_response, "status"):
        if riot_response["status"]["status_code"] == 429:
            return True

    return False


def check_logged_in(func):
    """check whether user is logged in"""

    @wraps(func)
    def wrapper(*args, **kwargs):
        if args and args[0].user.is_authenticated:
            return func(*args, **kwargs)
        return JsonResponse({"error": "로그인이 필요합니다."}, status=401)

    return wrapper
