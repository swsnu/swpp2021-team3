"""report urls"""
from django.urls import path
from . import views

urlpatterns = [
    path("reports/auth/", views.report_authentication, name="report_auth"),
]
