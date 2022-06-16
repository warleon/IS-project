from django.db import models
from django.db.models import UniqueConstraint

# Create your models here.
class User(models.Model):
	id = models.BigAutoField(primary_key = True)
	username = models.CharField(max_length = 30, blank = False)
	password = models.CharField(max_length = 50, blank = False)
	email = models.CharField(max_length = 100, blank = False)

class Video(models.Model):
    id = models.BigAutoField(primary_key = True)
    title = models.CharField(max_length = 100, blank = False)
    docfile = models.FileField(upload_to = 'documents/%Y/%m/%d',default="newvid")

class Related(models.Model):
    video_01 = models.ForeignKey(Video, on_delete = models.CASCADE, related_name = 'video')
    video_02 = models.ForeignKey(Video, on_delete = models.CASCADE, related_name = 'dependency')

    class Meta:
        constraints = [
            UniqueConstraint(name = 'pk_related', fields = ['video_01', 'video_02'])
        ]

class Vote(models.Model):
	id = models.BigAutoField(primary_key = True)
	user = models.ForeignKey(User, on_delete = models.CASCADE)
	video = models.ForeignKey(Video, on_delete = models.CASCADE)
	positive = models.BooleanField(default = True)
	
