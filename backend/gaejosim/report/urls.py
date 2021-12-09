"""report urls"""
from django.urls import path
from django.views.decorators.cache import cache_page
from . import views

urlpatterns = [
    path("home/", views.reports_statistics, name="home"),
    path("reports/<int:report_id>/", views.delete_report, name="report"),
    path("reports/<int:report_id>/apology/", views.apology, name="apology"),
    path(
        "reports/auth/",
        views.report_authentication,
        name="report_auth",
    ),
    path("reports/", views.post_report, name="report"),
    path("my/reports/", views.my_reports, name="my_reports"),
    path(
        "my/received_reports/",
        views.my_received_reports,
        name="my_received_reports",
    ),
]
