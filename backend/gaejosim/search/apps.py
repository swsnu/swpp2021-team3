"""search apps"""
from django.apps import AppConfig


class SearchConfig(AppConfig):
    """Search app config"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "search"
