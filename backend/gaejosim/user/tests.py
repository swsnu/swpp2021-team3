"""test for user"""
import json

from django.test import TestCase, Client
from report.models import Report
from .models import User, Summoner, MannerPoint


class UserTestCase(TestCase):
    """class for testing user feature"""

    def setUp(self):
        """set up for test"""
        self.manner_point = MannerPoint.objects.create()
        self.manner_point.save()
        self.test_summoner1 = Summoner.objects.create(
            summoner_puuid=(
                "BrwqoWacUEMkvpZCCmWOCpSNeV3xewLW7hWw"
                + "ScQeh0q8qvxZ2DracSi8ZJK54RduM3ojik7PfPFNUw"
            ),
            summoner_id=("6FXMN41iyS6TyDh12OTXEXiIIiN6OIf_9rQYAkhTDU7znMAe"),
            manner_point=self.manner_point,
        )
        self.test_summoner1.save()
        self.test_user1 = User.objects.create_user(
            username="test1",
            email="test1@swpp.com",
            password="password",
            summoner=self.test_summoner1,
        )
        self.test_user1.save()

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

    def test_success_signin(self):
        """test success signin"""
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

    def test_failed_signin_with_wrong_username(self):
        """test success signin"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/signin/",
            json.dumps(
                {
                    "username": "wrongusername",
                    "password": "password",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 403)

    def test_failed_signin_with_wrong_password(self):
        """test success signin"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/signin/",
            json.dumps(
                {
                    "username": "test1",
                    "password": "wrongpassword",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 403)

    def test_signup(self):
        """test sign up"""
        # request without csrf token
        client = Client(enforce_csrf_checks=True)
        response = client.post(
            "/api/signup/",
            json.dumps(self.test_json_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 403)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        # sign up success
        response = client.post(
            "/api/signup/",
            json.dumps(self.test_json_data),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        # not allowed request
        response = client.get("/api/signup/")
        self.assertEqual(response.status_code, 405)

    def test_signup_registed_summoner(self):
        """already registered summoner"""
        client = Client(enforce_csrf_checks=True)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value
        response = client.post(
            "/api/signup/",
            json.dumps(
                {
                    "username": "test10",
                    "email": "test10@swpp.com",
                    "password": "password",
                    "summoner_name": "301동여신",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_signup_invalid_summoner_name(self):
        """invalid summoner name"""
        client = Client(enforce_csrf_checks=True)

        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/signup/",
            json.dumps(
                {
                    "username": "test2",
                    "email": "test10@swpp.com",
                    "password": "password",
                    "summoner_name": "swpp2021fall",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_signup_invalid_username(self):
        """already existing username"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/signup/",
            json.dumps(
                {
                    "username": "test1",
                    "email": "test10@swpp.com",
                    "password": "password",
                    "summoner_name": "PASS",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_sign_up_invalid_email(self):
        """already existing email"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/signup/",
            json.dumps(
                {
                    "username": "test3",
                    "email": "test1@swpp.com",
                    "password": "password",
                    "summoner_name": "Deft",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_success_change_password(self):
        """change password"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        login = self.client.login(username="test1", password="password")
        self.assertTrue(login)

        response = self.client.post(
            "/api/change/password/",
            json.dumps(
                {
                    "old_password": "password",
                    "new_password": "password1",
                    "password_confirm": "password1",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)

        login = self.client.login(username="test1", password="password1")
        self.assertTrue(login)

        response = self.client.post(
            "/api/change/password/",
            json.dumps(
                {
                    "old_password": "password1",
                    "new_password": "password",
                    "password_confirm": "password",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)

    def test_fail_change_password_without_login(self):
        """try to change password without login, but fail"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/change/password/",
            json.dumps(
                {
                    "old_password": "login",
                    "new_password": "logout",
                    "password_confirm": "logout",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 401)

    def test_fail_change_password_old_wrong(self):
        """try to change password with wrong old password"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        login = self.client.login(username="test1", password="password")
        self.assertTrue(login)

        response = self.client.post(
            "/api/change/password/",
            json.dumps(
                {
                    "old_password": "login",
                    "new_password": "password1",
                    "password_confirm": "password1",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_fail_change_password_confirm_wrong(self):
        """try to change password with wrong old password"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        login = self.client.login(username="test1", password="password")
        self.assertTrue(login)

        response = self.client.post(
            "/api/change/password/",
            json.dumps(
                {
                    "old_password": "password",
                    "new_password": "password1",
                    "password_confirm": "wrongpassword",
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_sucess_find_username(self):
        """find username"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/forgot/id/",
            json.dumps({"email": "test1@swpp.com"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 200)

    def test_fail_find_username(self):
        """not registed email"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/forgot/id/",
            json.dumps({"email": "test100@swpp.com"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 400)

    def test_success_find_password(self):
        """find password"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/forgot/password/",
            json.dumps({"email": "test1@swpp.com", "username": "test1"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)

    def test_fail_find_password(self):
        """no user who has the username and email"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/forgot/password/",
            json.dumps({"email": "test100@swpp.com", "username": "test1"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/forgot/password/",
            json.dumps({"email": "test1@swpp.com", "username": "test100"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

    def test_success_logout(self):
        """test success logout"""
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

        response = client.post(
            "/api/logout/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 200)

    def test_fail_logout(self):
        """test failed logout"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.post(
            "/api/logout/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 401)

    def test_update_summoner_name_success(self):
        """update summoner name successfully """

        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        login = self.client.login(username="test1", password="password")
        self.assertTrue(login)

        response = self.client.put(
            "/api/update/summoner/",
            json.dumps({"new_summoner_name": "301동여신"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 200)

    def test_update_summoner_name_without_login_fail(self):
        """update summoner name without login"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = self.client.put(
            "/api/update/summoner/",
            json.dumps({"new_summoner_name": "301동여신"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 401)

    def test_update_incorrect_summoner_name_fail(self):
        """update incorrect summoner name"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        login = self.client.login(username="test1", password="password")
        self.assertTrue(login)

        response = self.client.put(
            "/api/update/summoner/",
            json.dumps({"new_summoner_name": "서모너서모너"}),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 400)


class MyPageTestCase(TestCase):
    """class for testing my page"""

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

        self.report_3 = Report.objects.create(
            tag="tag3tag4",
            comment="test_comment",
            reported_summoner=self.test_summoner1,
            reporting_user=self.test_user3,
            evaluation=70,
        )

        self.report_4 = Report.objects.create(
            tag="tag3tag4",
            comment="test_comment",
            reported_summoner=self.test_summoner3,
            reporting_user=self.test_user1,
            evaluation=70,
        )

    def test_fail_mypage_not_loggedin(self):
        """test fail GET mypage since the user is not logged in"""
        client = Client(enforce_csrf_checks=True)
        response = client.get("/api/token/")
        csrftoken = response.cookies["csrftoken"].value

        response = client.get(
            "/api/mypage/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        self.assertEqual(response.status_code, 401)

    def test_success_mypage(self):
        """test success mypage"""
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
            "/api/mypage/",
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["user"]["username"], "test1")
        self.assertEqual(data["user"]["email"], "test1@swpp.com")
        self.assertEqual(len(data["reports"]["reports_for_user"]), 2)
        self.assertEqual(len(data["reports"]["reports_by_user"]), 1)
