"""test for search"""
from django.test import TestCase, Client
from user.models import User, Summoner, MannerPoint


class SearchTestCase(TestCase):
    """class for testing search feature"""

    def setUp(self):
        """set up for test"""
        self.test_manner_point1 = MannerPoint.objects.create()

        self.test_summoner1 = Summoner.objects.create(
            summoner_puuid=(
                "LhALH8cJjZrGgCsiO5Obmxb2ZB2jCZzAOSoL7k9"
                + "KVE_TD2EoydA9u5UCHykUxMU_bjq3bUR67RJu1w"
            ),
            summoner_id=("8Jx0TrOYnYdR8e-mKkykFWThuHYQn5zO8FawWyNS5jkOl2spaohrC_SW"),
            manner_point=self.test_manner_point1,
        )
        self.test_summoner1.save()

        self.test_user1 = User.objects.create_user(
            username="test",
            email="test@email.com",
            password="password",
            summoner=self.test_summoner1,
        )

    def test_success_multisearch(self):
        """multisearch test success"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.get(
            "/api/search/?type=multi&summoners=알루미늄,얼루미늄,니꼬치삼센치,삼센치아님,nooooosuchuserrrrrrrrrr",
            content_type="application/json; charset=utf-8",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        data = response.json()["matchers"]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data[0]["summoner_name"], "알루미늄")
        self.assertEqual(data[0]["manner_point"], None)
        self.assertEqual(data[0]["tier"], {"tier": "SILVER", "rank": "I"})
        self.assertEqual(len(data[0]["recent_result"]), 10)
        self.assertEqual(data[0]["recent_result"][0]["lane"], "TOP")
        self.assertEqual(data[0]["recent_result"][0]["kills"], 1)
        self.assertEqual(data[0]["recent_result"][0]["deaths"], 5)
        self.assertEqual(data[0]["recent_result"][0]["assists"], 5)
        self.assertEqual(data[0]["recent_result"][0]["champion_id"], 17)
        self.assertEqual(data[0]["recent_result"][0]["win"], False)
        self.assertEqual(data[1]["summoner_name"], "얼루미늄")
        self.assertEqual(data[1]["manner_point"], None)
        self.assertEqual(data[1]["tier"], {"tier": "BRONZE", "rank": "I"})
        self.assertEqual(len(data[1]["recent_result"]), 10)
        self.assertEqual(data[1]["recent_result"][0]["lane"], "TOP")
        self.assertEqual(data[1]["recent_result"][0]["kills"], 4)
        self.assertEqual(data[1]["recent_result"][0]["deaths"], 8)
        self.assertEqual(data[1]["recent_result"][0]["assists"], 0)
        self.assertEqual(data[1]["recent_result"][0]["champion_id"], 67)
        self.assertEqual(data[1]["recent_result"][0]["win"], False)
        self.assertEqual(data[2]["summoner_name"], "니꼬치삼센치")
        self.assertEqual(data[2]["manner_point"], 80)
        self.assertEqual(data[2]["tier"], None)
        self.assertEqual(len(data[2]["recent_result"]), 0)
        self.assertEqual(data[3]["summoner_name"], "삼센치아님")
        self.assertEqual(data[3]["manner_point"], None)
        self.assertEqual(data[3]["tier"], None)
        self.assertEqual(len(data[3]["recent_result"]), 0)
        self.assertEqual(data[4], {"summoner_name": "nooooosuchuserrrrrrrrrr"})

    def test_failed_multisearch_without_queries(self):
        """multisearch test success"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.get(
            "/api/search/?type=&summoners=알루미늄,얼루미늄,니꼬치삼센치,삼센치아님,nooooosuchuserrrrrrrrrr",
            content_type="application/json; charset=utf-8",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        response = client.get(
            "/api/search/?type=multi&summoners=",
            content_type="application/json; charset=utf-8",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)
