"""test for report"""
import json
from django.test import TestCase, Client
from user.models import Summoner, User


class ReportTestCase(TestCase):
    """class for testing report feature"""

    def setUp(self):
        """set up for test"""
        self.test_summoner1 = Summoner.objects.create(
            summoner_puuid=(
                "BrwqoWacUEMkvpZCCmWOCpSNeV3xewLW7hWwSc",
                "Qeh0q8qvxZ2DracSi8ZJK54RduM3ojik7PfPFNUw",
            ),
            summoner_id=("8uopZZbQAokiGkW68Ch8bfvZE1zlHAhRgViy37GIDxnP1Aia"),
        )
        self.test_summoner1.save()

        self.test_user1 = User.objects.create_user(
            username="test1",
            email="test1@swpp.com",
            password="password",
            summoner=self.test_summoner1,
        )

    def test_success_get_recent_players(self):
        """test success to get recent teamplayers"""
        login = self.client.login(username="test1", password="password")
        self.assertTrue(login)

        response = self.client.get("/api/reports/auth/")
        self.assertEqual(response.status_code, 200)

    def test_failed_get_recent_players_without_login(self):
        """test to get recent teamplayers"""
        response = self.client.get("/api/reports/auth/")
        self.assertEqual(response.status_code, 401)

    def test_success_authentication(self):
        """authenticate with username"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = self.client.get("/api/reports/auth/")
        player1 = response.json()["recent_players"][0]

        response = self.client.post(
            "/api/reports/auth/",
            json.dumps({"summoner_name": player1}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
