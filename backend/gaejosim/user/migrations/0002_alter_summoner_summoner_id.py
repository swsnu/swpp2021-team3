# Generated by Django 3.2.8 on 2021-10-30 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='summoner',
            name='summoner_id',
            field=models.CharField(max_length=255),
        ),
    ]
