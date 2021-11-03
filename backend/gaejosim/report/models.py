"""models for report"""
from django.db import models
from user.models import Summoner


class Report(models.Model):
    """Report model"""

    tag = models.TextField()
    comment = models.CharField(max_length=2000)
    reported_summoner = models.OneToOneField(
        Summoner, on_delete=models.CASCADE, related_name="reported"
    )
    reported_user = models.OneToOneField(
        Summoner, on_delete=models.CASCADE, related_name="reporting"
    )
    evaluation = models.IntegerField()
    match_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
