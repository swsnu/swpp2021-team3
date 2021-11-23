"""Util functions for the service"""


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
