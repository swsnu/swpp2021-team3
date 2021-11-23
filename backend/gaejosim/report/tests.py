"""test for report"""
import json
from datetime import datetime, timedelta
from pytz import timezone
from django.test import TestCase, Client
from user.models import Summoner, User, MannerPoint
from report.models import Report


class ReportTestCase(TestCase):
    """class for testing report feature"""

    def setUp(self):
        """set up for test"""
        self.manner_point1 = MannerPoint.objects.create()
        self.test_summoner1 = Summoner.objects.create(
            summoner_puuid=(
                "BrwqoWacUEMkvpZCCmWOCpSNeV3xewLW7hWwSc"
                + "Qeh0q8qvxZ2DracSi8ZJK54RduM3ojik7PfPFNUw",
            ),
            summoner_id=("6FXMN41iyS6TyDh12OTXEXiIIiN6OIf_9rQYAkhTDU7znMAe"),
            manner_point=self.manner_point1,
        )
        self.test_summoner1.save()

        self.test_user1 = User.objects.create_user(
            username="test1",
            email="test1@swpp.com",
            password="password",
            summoner=self.test_summoner1,
        )

        self.manner_point2 = MannerPoint.objects.create()
        self.test_summoner2 = Summoner.objects.create(
            summoner_puuid=(
                "KgYZAM7Hpw9KrbsXRA3lUu3ggfa1hqPVlNSjkC"
                "lLXmdXQtl3oHJ2Ru_khoEqlcD50kul9bWbLBZChw"
            ),
            summoner_id=("0Fhe_5f7uVFLejRSWJ3GNDDFa10KCchYrdonT_rWEw5R-kxvHAh0YdE4cA"),
            manner_point=self.manner_point2,
        )

        self.test_user2 = User.objects.create_user(
            username="test2",
            email="test2@swpp.com",
            password="password",
            summoner=self.test_summoner2,
        )

        self.report_1 = Report.objects.create(
            tag="tag1tag2",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=60,
        )

        self.report_2 = Report.objects.create(
            tag="tag3tag4",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=70,
        )

        self.manner_point3 = MannerPoint.objects.create()
        self.test_summoner3 = Summoner.objects.create(
            summoner_puuid=(
                "LhALH8cJjZrGgCsiO5Obmxb2ZB2jCZzAOSoL7k9KV"
                "E_TD2EoydA9u5UCHykUxMU_bjq3bUR67RJu1w"
            ),
            summoner_id=("8Jx0TrOYnYdR8e-mKkykFWThuHYQn5zO8FawWyNS5jkOl2spaohrC_SW"),
            manner_point=self.manner_point3,
        )

        self.test_user3 = User.objects.create_user(
            username="test3",
            email="test3@swpp.com",
            password="password",
            summoner=self.test_summoner3,
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

    def test_failed_authentication(self):
        """authenticate fail with no records"""
        self.client.login(username="test3", password="password")

        response = self.client.get("/api/reports/auth/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["recent_players"], [])

    def test_fail_post_report_without_login(self):
        """test fail to post report without login"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/",
            json.dumps(
                {
                    "name": "서울대",
                    "evaluation": 60,
                    "tag": "tag1_1,tag2_2,tag4_1,tag5_2",
                    "comment": "졸린데",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

    def test_fail_post_report_without_tag(self):
        """test fail to post report without tag"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = self.client.post(
            "/api/reports/",
            json.dumps(
                {"name": "서울대", "evaluation": 60, "tag": "", "comment": "comment_1"}
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_fail_invalid_summoner_report(self):
        """make a report"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = self.client.post(
            "/api/reports/",
            json.dumps(
                {
                    "name": "swpp2021fall",
                    "evaluation": 40,
                    "tag": "tag1_1,tag4_2",
                    "comment": "comment_2",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_success_post_report_existing_summoner(self):
        """make a report"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = self.client.post(
            "/api/reports/",
            json.dumps(
                {
                    "name": "조이26",
                    "evaluation": 40,
                    "tag": "tag1_1,tag4_2",
                    "comment": "comment_2",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

    def test_success_post_report_new_summoner(self):
        """make a report"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = self.client.post(
            "/api/reports/",
            json.dumps(
                {
                    "name": "서울대",
                    "evaluation": 40,
                    "tag": "tag1_1,tag2_2,tag3_1,tag5_1,tag4_2",
                    "comment": "comment_2",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        test_summoner = Summoner.objects.get(
            summoner_id="KsbxDVlM72XHWA0ZFkAdbCHkXIScc3bRH8Qjb2qJRwDo9CI"
        )
        self.assertEqual(test_summoner.manner_point.point, 60)
        self.assertEqual(test_summoner.manner_point.tag1, 4)
        self.assertEqual(test_summoner.manner_point.tag2, 4)

    def test_success_poist_with_empty_comment(self):
        """make a report with empty string comment"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")
        response = self.client.post(
            "/api/reports/",
            json.dumps(
                {
                    "name": "연세대",
                    "evaluation": 40,
                    "tag": "tag1_1,tag2_2,tag3_1,tag5_1,tag4_2",
                    "comment": "",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

    def test_success_my_reports(self):
        """list of my reports"""
        self.client.login(username="test2", password="password")
        response = self.client.get("/api/my/reports/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["reports"]), 2)

        reports = response.json()["reports"]
        self.assertEqual(reports[0]["evaluation"], 60)
        self.assertEqual(reports[1]["evaluation"], 70)

    def test_fail_my_reports_without_login(self):
        """list of my reports"""
        response = self.client.get("/api/my/reports/")
        self.assertEqual(response.status_code, 401)

    def test_success_with_statistics(self):
        """Test statistics success"""
        self.report_1.created_at = datetime.now(timezone("Asia/Seoul")) + timedelta(
            days=-2
        )
        self.report_1.save()
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/home/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["accumulated_reports"], 2)
        self.assertEqual(response.json()["today_reports"], 1)


class HomePageTest(TestCase):
    """class for testing statistics feature in home page"""

    def setUp(self):
        """set up for test"""
        self.manner_point1 = MannerPoint.objects.create()
        self.test_summoner1 = Summoner.objects.create(
            summoner_puuid=(
                "BrwqoWacUEMkvpZCCmWOCpSNeV3xewLW7hWwSc"
                + "Qeh0q8qvxZ2DracSi8ZJK54RduM3ojik7PfPFNUw",
            ),
            summoner_id=("6FXMN41iyS6TyDh12OTXEXiIIiN6OIf_9rQYAkhTDU7znMAe"),
            manner_point=self.manner_point1,
        )
        self.test_summoner1.save()

        self.test_user1 = User.objects.create_user(
            username="test1",
            email="test1@swpp.com",
            password="password",
            summoner=self.test_summoner1,
        )

        self.manner_point2 = MannerPoint.objects.create()
        self.test_summoner2 = Summoner.objects.create(
            summoner_puuid=(
                "KgYZAM7Hpw9KrbsXRA3lUu3ggfa1hqPVlNSjkC"
                "lLXmdXQtl3oHJ2Ru_khoEqlcD50kul9bWbLBZChw"
            ),
            summoner_id=("0Fhe_5f7uVFLejRSWJ3GNDDFa10KCchYrdonT_rWEw5R-kxvHAh0YdE4cA"),
            manner_point=self.manner_point2,
        )

        self.test_user2 = User.objects.create_user(
            username="test2",
            email="test2@swpp.com",
            password="password",
            summoner=self.test_summoner2,
        )

    def test_success_without_total_reports(self):
        """Test statistics without total reports"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/home/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["accumulated_reports"], 0)
        self.assertEqual(response.json()["today_reports"], 0)

    def test_success_without_today_reports(self):
        """Test statistics without today reports"""
        report_1 = Report.objects.create(
            tag="tag3tag4",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=70,
        )
        report_1.created_at = datetime.now(timezone("Asia/Seoul")) + timedelta(days=-2)
        report_1.save()

        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/home/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["accumulated_reports"], 1)
        self.assertEqual(response.json()["today_reports"], 0)
