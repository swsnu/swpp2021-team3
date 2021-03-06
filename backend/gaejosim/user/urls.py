"""user urls"""
from django.urls import path
from . import views

urlpatterns = [
    path("signin/", views.sign_in, name="signin"),
    path("signup/", views.sign_up, name="signup"),
    path("logout/", views.log_out, name="logout"),
    path("token/", views.token, name="token"),
    path("change/password/", views.change_password, name="change_password"),
    path("forgot/id/", views.find_username, name="find username"),
    path("forgot/password/", views.find_password, name="find password"),
    path("mypage/", views.my_page, name="my page"),
    path("update/summoner/", views.update_summoner_name,
         name="update summoner name"),
]
