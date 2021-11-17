"""models for user"""

from django.db import models
from django.contrib.auth.models import AbstractUser


class MannerPoint(models.Model):
    """Manner Point model"""

    point = models.IntegerField(default=80)
    tag1 = models.IntegerField(default=5, null=False)
    tag2 = models.IntegerField(default=5, null=False)
    tag3 = models.IntegerField(default=5, null=False)
    tag4 = models.IntegerField(default=5, null=False)
    tag5 = models.IntegerField(default=5, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Summoner(models.Model):
    """Summoner model"""

    summoner_id = models.CharField(max_length=255, null=True)
    summoner_puuid = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    manner_point = models.OneToOneField(
        MannerPoint, on_delete=models.CASCADE, null=True
    )


class User(AbstractUser):
    """User customized model"""

    email = models.EmailField(verbose_name="email", unique=True)
    summoner = models.OneToOneField(
        Summoner, on_delete=models.CASCADE, null=True)
