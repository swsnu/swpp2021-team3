"""user apps"""
from django.apps import AppConfig

class UserConfig(AppConfig):
    """user app config"""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user'
