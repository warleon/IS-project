from django.urls import path
from django.views.generic.base import TemplateView

from . import views
app_name = 'BigTeta'
urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.index, name='home'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout_user, name='logout'),
    path('show/', views.show_video, name='showVideo'),
    path('showFiles', views.showFiles, name='showFiles'),
]