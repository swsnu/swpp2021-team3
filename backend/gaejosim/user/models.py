"""models for user"""

from django.db import models
from django.contrib.auth.models import AbstractUser


class Summoner(models.Model):
    """Summoner model"""
    summoner_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class User(AbstractUser):
    """User customized model"""
    email = models.EmailField(verbose_name="email", unique=True)
    summoner = models.OneToOneField(Summoner, on_delete=models.CASCADE, null=True)
