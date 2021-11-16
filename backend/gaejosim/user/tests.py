"""test for user"""
import json

from django.test import TestCase, Client
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
                    "password_confirm": "password1"
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
                    "password_confirm": "password"
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
                    "password_confirm": "logout"
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
                    "password_confirm": "password1"
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
                    "password_confirm": "wrongpassword"
                }
            ),
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)
