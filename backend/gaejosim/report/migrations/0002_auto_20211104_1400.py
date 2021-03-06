# Generated by Django 3.2.8 on 2021-11-04 14:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('report', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='report',
            name='match_id',
        ),
        migrations.RemoveField(
            model_name='report',
            name='reported_user',
        ),
        migrations.AddField(
            model_name='report',
            name='reporting_user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reporting', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='report',
            name='comment',
            field=models.CharField(max_length=2000, null=True),
        ),
    ]
