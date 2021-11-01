"""user urls"""
from django.urls import path
from . import views

urlpatterns = [
    # path('signin/', views.sign_in, name='signin'),
    path("token/", views.token, name="token"),
]
