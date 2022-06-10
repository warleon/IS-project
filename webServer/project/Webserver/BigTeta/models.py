from django.db import models

# Create your models here.
class User(models.Model):
	id = models.BigAutoField(primary_key=True)
	username = models.CharField(max_length=30,blank=False)
	password = models.CharField(max_length=50,blank=False)
	email = models.CharField(max_length=100,blank=False)

class Video(models.Model):
	id = models.BigAutoField(primary_key=True)
	title = models.CharField(max_length=100,blank=False)
	filename = models.CharField(max_length=100,blank=False)
	urlAuxiliar = models.CharField(max_length=256,blank=False)
	docfile = models.FileField(upload_to='documents/%Y/%m/%d',default="newvid")

class Vote(models.Model):
	id = models.BigAutoField(primary_key=True)
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	video = models.ForeignKey(Video,on_delete=models.CASCADE)
	positive = models.BooleanField(default=True)
	