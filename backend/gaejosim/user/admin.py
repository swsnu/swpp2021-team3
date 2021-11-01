"""user admin"""
from django.contrib import admin
from .models import User, Summoner

# Register your models here.

admin.site.register(User)
admin.site.register(Summoner)
