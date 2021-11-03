"""test for report"""
import json

from django.test import TestCase, Client
from .models import User, Summoner


class ReportTestCase(TestCase):
    """class for testing report feature"""

    def setUp(self):
        """set up for test"""
        self.test_summoner1 = Summoner.objects.create(
            summoner_puuid=(
                "tYHShqNpN6xATI_lwWhSw6wZqsFuNnB70nV1ie98yJ"
                "dmhAmOPCkXTWOI_Pp_lHf2DAcS2m7B18ZqJQ"
            ),
            summoner_id=(
                "8uopZZbQAokiGkW68Ch8bfvZE1zlHAhRgViy37GIDxnP1Aia"
            )
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
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value
