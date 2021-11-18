"""report urls"""
from django.urls import path
from . import views

urlpatterns = [
    path("reports/auth/", views.report_authentication, name="report_auth"),
    path("reports/", views.post_report, name="report"),
    path("my/reports/", views.my_reports, name="my_reports")
]
