from .models import Video, Related
from django.http import JsonResponse
from django.forms.models import model_to_dict

import logging

logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def get_video_by_title(request):
  segment = request.GET.get('title')
  if(len(segment)):
    videos = Video.objects.filter(title__icontains=segment)
    return JsonResponse(list(videos.values()), safe=False)
  else:
    return JsonResponse([], safe=False)

def get_dependecies_from_video_id(request):
  try:
    id = request.GET.get('id')
    relations = Related.objects.filter(video_01_id=int(id))
    videos=[]
    for relation in relations:
      video =Video.objects.get(pk=relation.video_02_id)
      json = model_to_dict(video)
      del json["docfile"]
      json["author"] = video.author.username
      videos.append(json)
    logger.info(videos)
    return JsonResponse(videos, safe=False)
  except ValueError as e:
    logger.error(e)
    return JsonResponse([], safe=False)
