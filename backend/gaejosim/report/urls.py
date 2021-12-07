"""report urls"""
from django.urls import path
from django.views.decorators.cache import cache_page
from . import views

urlpatterns = [
    path("home/", cache_page(60)(views.reports_statistics), name="home"),
    path("reports/<int:report_id>/", views.delete_report, name="report"),
    path("reports/<int:report_id>/apology/", views.apology, name="apology"),
    path(
        "reports/auth/",
        cache_page(300)(views.report_authentication),
        name="report_auth",
    ),
    path("reports/", views.post_report, name="report"),
    path("my/reports/", cache_page(300)(views.my_reports), name="my_reports"),
    path(
        "my/received_reports/",
        cache_page(300)(views.my_received_reports),
        name="my_received_reports",
    ),
]
