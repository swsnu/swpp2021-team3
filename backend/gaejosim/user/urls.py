"""user urls"""
from django.urls import path
from . import views

urlpatterns = [
    path("signin/", views.sign_in, name="signin"),
    path("signup/", views.sign_up, name="signup"),
    path("token/", views.token, name="token"),
    path("change/password/", views.change_password, name="change_password")
]
