"""test for report"""
import json
from datetime import datetime, timedelta
from pytz import timezone
from django.test import TestCase, Client
from user.models import Summoner, User, MannerPoint
from report.models import Report, Apology


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
            summoner_id=(
                "0Fhe_5f7uVFLejRSWJ3GNDDFa10KCchYrdonT_rWEw5R-kxvHAh0YdE4cA"),
            manner_point=self.manner_point2,
        )

        self.test_user2 = User.objects.create_user(
            username="test2",
            email="test2@swpp.com",
            password="password",
            summoner=self.test_summoner2,
        )

        self.report_1 = Report.objects.create(
            tag="과격한 언행,고의성 던짐",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=60,
        )

        self.report_2 = Report.objects.create(
            tag="대리 게임,팀킬",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=70,
        )

        self.report_3 = Report.objects.create(
            tag="대리 게임,팀킬",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=30,
        )

        self.manner_point3 = MannerPoint.objects.create()
        self.test_summoner3 = Summoner.objects.create(
            summoner_puuid=(
                "LhALH8cJjZrGgCsiO5Obmxb2ZB2jCZzAOSoL7k9KV"
                "E_TD2EoydA9u5UCHykUxMU_bjq3bUR67RJu1w"
            ),
            summoner_id=(
                "8Jx0TrOYnYdR8e-mKkykFWThuHYQn5zO8FawWyNS5jkOl2spaohrC_SW"),
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
                    "tag": "과격한 언행,탈주/닷지,cs 스틸,라인 거부",
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
                    "tag": "과격한 언행,팀킬",
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
                    "tag": "과격한 언행,팀킬",
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
                    "tag": "과격한 언행,탈주/닷지,대리 게임,정치,라인 거부",
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
        self.assertEqual(test_summoner.manner_point.tag1, 4.5)
        self.assertEqual(test_summoner.manner_point.tag2, 4.5)

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
                    "tag": "과격한 언행,탈주/닷지,대리 게임,정치,팀킬",
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
        self.assertEqual(len(response.json()["reports"]), 3)

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
        self.assertEqual(response.json()["accumulated_reports"], 3)
        self.assertEqual(response.json()["today_reports"], 2)
        self.assertEqual(response.json()["not_answered_reports"], 0)


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
            summoner_id=(
                "0Fhe_5f7uVFLejRSWJ3GNDDFa10KCchYrdonT_rWEw5R-kxvHAh0YdE4cA"),
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
            tag="대리 게임,팀킬",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=70,
        )
        report_1.created_at = datetime.now(
            timezone("Asia/Seoul")) + timedelta(days=-2)
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


class MyReportTestCase(TestCase):
    """class for testing my received reports"""

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
            summoner_id=(
                "0Fhe_5f7uVFLejRSWJ3GNDDFa10KCchYrdonT_rWEw5R-kxvHAh0YdE4cA"),
            manner_point=self.manner_point2,
        )

        self.test_user2 = User.objects.create_user(
            username="test2",
            email="test2@swpp.com",
            password="password",
            summoner=self.test_summoner2,
        )

        self.report_1 = Report.objects.create(
            tag="과격한 언행,고의성 던짐",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user2,
            evaluation=60,
        )

        self.report_2 = Report.objects.create(
            tag="대리 게임,팀킬",
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
            summoner_id=(
                "8Jx0TrOYnYdR8e-mKkykFWThuHYQn5zO8FawWyNS5jkOl2spaohrC_SW"),
            manner_point=self.manner_point3,
        )

        self.test_user3 = User.objects.create_user(
            username="test3",
            email="test3@swpp.com",
            password="password",
            summoner=self.test_summoner3,
        )

        self.report_3 = Report.objects.create(
            tag="대리 게임,cs 스틸",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user3,
            evaluation=70,
        )

        self.report_4 = Report.objects.create(
            tag="대리 게임,cs 스틸",
            comment="test_comment",
            reported_summoner=self.test_summoner3,
            reporting_user=self.test_user1,
            evaluation=70,
        )

        self.test_user4 = User.objects.create_user(
            username="test4",
            email="test4@swpp.com",
            password="password",
            summoner=None,
        )

    def test_fail_mypage_not_loggedin(self):
        """test fail GET my received reports since the user is not logged in"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.get(
            "/api/my/received_reports/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 401)

    def test_success_mypage(self):
        """test success my received reports"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/signin/",
            json.dumps(
                {
                    "username": "test1",
                    "password": "password",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 200)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.get(
            "/api/my/received_reports/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["reports"]), 3)
        self.assertEqual(data["reports"][0]["tag"], "과격한 언행,고의성 던짐")
        self.assertEqual(data["reports"][0]["comment"], "test_comment")
        self.assertEqual(data["reports"][0]["evaluation"], 60)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.get(
            "/api/home/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["accumulated_reports"], 4)
        self.assertEqual(data["today_reports"], 4)
        self.assertEqual(data["not_answered_reports"], 3)

    def test_success_myreceivedreports(self):
        """test success my received reports"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/signin/",
            json.dumps(
                {
                    "username": "test4",
                    "password": "password",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 200)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.get(
            "/api/my/received_reports/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(data["reports"]), 0)

    def test_success_post_apology(self):
        """test success POST apology"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        data = response.json()
        self.assertEqual(data["content"], "정말 죄송합니다. 다음부터 안 그러겠습니다.")
        self.assertEqual(data["is_verified"], True)
        self.assertEqual(data["report_id"], self.report_1.id)

    def test_fail_post_apology_ml(self):
        """test fail POST apology due to ml analysis"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_3.id) + "/apology/",
            json.dumps(
                {
                    "content": "신난다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_3.id) + "/apology/",
            json.dumps(
                {
                    "content": "",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_fail_post_apology(self):
        """test fail POST apology"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + "100" + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 404)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        data = response.json()
        self.assertEqual(data["content"], "정말 죄송합니다. 다음부터 안 그러겠습니다.")
        self.assertEqual(data["is_verified"], True)
        self.assertEqual(data["report_id"], self.report_1.id)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        self.client.login(username="test2", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

    def test_success_put_apology(self):
        """test success PUT apology"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.put(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertEqual(data["content"], "정말 죄송합니다. 다음부터 안 그러겠습니다.")
        self.assertEqual(data["is_verified"], True)
        self.assertEqual(data["report_id"], self.report_1.id)

    def test_fail_put_apology(self):
        """test fail PUT apology"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.put(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.put(
            "/api/reports/" + str(self.report_2.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 404)

        self.client.login(username="test2", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

    def test_fail_put_apology_ml(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_3.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.put(
            "/api/reports/" + str(self.report_3.id) + "/apology/",
            json.dumps(
                {
                    "content": "",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.put(
            "/api/reports/" + str(self.report_3.id) + "/apology/",
            json.dumps(
                {
                    "content": "너나 잘하세요.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_success_get_apology(self):
        """test success GET apology"""
        client = Client(enforce_csrf_checks=True)
        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 404)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["content"], "정말 죄송합니다. 다음부터 안 그러겠습니다.")
        self.assertEqual(data["is_verified"], True)
        self.assertEqual(data["report_id"], self.report_1.id)

    def test_fail_get_apology(self):
        """test fail GET apology"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

        self.client.login(username="test3", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

        self.client.login(username="test1", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.post(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            json.dumps(
                {
                    "content": "정말 죄송합니다. 다음부터 안 그러겠습니다.",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/reports/" + str(self.report_2.id) + "/apology/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 404)

        self.client.login(username="test2", password="password")

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.get(
            "/api/reports/" + str(self.report_1.id) + "/apology/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
