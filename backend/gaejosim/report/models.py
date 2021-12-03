"""report model"""
from django.db import models
from user.models import Summoner, User


class Apology(models.Model):
    """Apology model"""

    content = models.CharField(max_length=5000, null=False)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Report(models.Model):
    """Report model"""

    tag = models.TextField()
    comment = models.CharField(max_length=2000, null=True)
    reported_summoner = models.ForeignKey(
        Summoner, on_delete=models.CASCADE, related_name="reported"
    )
    reporting_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="reporting", null=True
    )
    evaluation = models.IntegerField()
    apology = models.OneToOneField(Apology, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
