from django.urls import path
from django.views.generic.base import TemplateView

from . import views
app_name = 'BigTeta'
urlpatterns = [
    path('home', views.index, name='index'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),

]