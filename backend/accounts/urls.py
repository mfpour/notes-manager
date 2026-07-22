from django.urls import path

from .views import register, login_view, logout_view, csrf

urlpatterns = [
    path("register/", register),
    path("login/", login_view),
    path("logout/", logout_view),
    path("csrf/", csrf),
]