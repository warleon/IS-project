from django.urls import path
from django.views.generic.base import TemplateView

from . import views
app_name = 'BigTeta'
urlpatterns = [
    path('', views.index, name='index'),
]