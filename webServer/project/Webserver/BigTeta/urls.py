from django.urls import path
from . import views
from . import api

app_name = 'BigTeta'
urlpatterns = [
    path('', views.showFiles, name='showVideos'),
    path('home', views.index, name='home'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('logout', views.logout_user, name='logout'),
    path('show', views.show_video, name='showVideo'),
    path('showFiles', views.showFiles, name='showFiles'),
    path('upload', views.upload, name='upload'),
    path('getvideos', api.get_video_by_title, name='getVideos'),
    path('getdependencies', api.get_dependecies_from_video_id, name='getdependencies'),
]
