# Generated by Django 3.2.8 on 2021-11-17 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_merge_0002_auto_20211103_1226_0004_auto_20211103_1543'),
    ]

    operations = [
        migrations.AddField(
            model_name='summoner',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
