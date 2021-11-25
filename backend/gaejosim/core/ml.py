"""ml feature"""
import urllib
import json
import ssl

from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, EmotionOptions
from ibm_cloud_sdk_core.api_exception import ApiException


def papago_translate(ko_text):
    """translate ko to en"""
    naver_client_id = "2e4MUIzRLZ0qmLXFKKYF"
    naver_client_secret = "6uziNTpoU0"

    encoded_text = urllib.parse.quote(ko_text)
    data = "source=ko&target=en&text=" + encoded_text
    papago_url = "https://openapi.naver.com/v1/papago/n2mt"

    request = urllib.request.Request(papago_url)
    request.add_header("X-Naver-Client-Id", naver_client_id)
    request.add_header("X-Naver-Client-Secret", naver_client_secret)

    context = ssl._create_unverified_context()
    response = urllib.request.urlopen(
        request, data=data.encode("utf-8"), context=context)
    rescode = response.getcode()

    if(rescode == 200):
        response_body = response.read()
        message = json.loads(response_body.decode('utf-8'))["message"]
        en_text = message['result']["translatedText"]
        return en_text

    else:
        return None


def watson_nlu_emotion(en_text):
    """emotion analysis by ibm watson"""
    apikey = "InN4NtiMLwZEqAr-0B2-cZYUw3uL0XM8OxWCoiO2eYL2"

    url = "https://api.kr-seo.natural-language-understanding.watson.cloud.ibm.com/instances/626a92c2-bab1-47fd-9007-503fde87b5a8"

    authenticator = IAMAuthenticator(f'{apikey}')
    natural_language_understanding = NaturalLanguageUnderstandingV1(
        version='2021-08-01',
        authenticator=authenticator
    )

    natural_language_understanding.set_service_url(f'{url}')

    vocabs = en_text.split(' ')

    try:
        response = natural_language_understanding.analyze(
            text=f'{en_text}',
            language="en",
            features=Features(emotion=EmotionOptions(targets=vocabs))).get_result()

    except ApiException as e:
        return False

    text_emotion_json = response['emotion']['document']['emotion']

    sadness = text_emotion_json['sadness']
    fear = text_emotion_json['fear']

    if sadness + fear > 0.5:
        return True

    return False
