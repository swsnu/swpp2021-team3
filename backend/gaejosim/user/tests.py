"""test for user"""
import json

from django.test import TestCase, Client
from .models import User, Summoner


class UserTestCase(TestCase):
    """class for testing user feature"""

    def setUp(self):
        """set up for test"""
        self.test_summoner1 = Summoner.objects.create(
            summoner_id="tYHShqNpN6xATI_lwWhSw6wZqsFuNnB70nV1ie98yJdmhAmOPCkXTWOI_Pp_lHf2DAcS2m7B18ZqJQ"
        )
        self.test_summoner1.save()
        self.test_user1 = User.objects.create_user(
            username="test1",
            email="test1@swpp.com",
            password="password",
            summoner=self.test_summoner1,
        )

        self.test_json_data = {
            "username": "test2",
            "email": "test2@swpp.com",
            "password": "password",
            "summoner_name": "faker",
        }

    def test_token(self):
        """test csrf token"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/token/",
            json.dumps({}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 405)
