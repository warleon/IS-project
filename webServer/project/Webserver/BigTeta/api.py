from .models import Video, Related, Vote
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.db.utils import IntegrityError

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
      del json["thumbnail"]
      json["author"] = model_to_dict(video.author)
      videos.append(json)
    return JsonResponse(videos, safe=False)
  except ValueError as e:
    logger.error(e)
    return JsonResponse([], safe=False)

def get_votes_from_video_id(request):
  try:
    id = request.GET.get('id')
    votes = Vote.objects.filter(video_id=int(id))
    cvotes = votes.count()
    pvotes = votes.filter(positive=True).count()
    nvotes = cvotes - pvotes
    res = {}
    res["positive"] = pvotes
    res["negative"] = nvotes
    return JsonResponse(res,safe=False)
  except ValueError as e:
    return JsonResponse({},safe=False)

def post_vote(request):
  if request.user.is_authenticated:
    try:
      id = int(request.POST['id'])
      pos = bool(int(request.POST['positive']))
      vid = Video.objects.get(pk=id)
      vote = Vote(user=request.user,video=vid,positive=pos)
      vote.save()
      res = {}
      res["positive"] = int(pos)
      res["negative"] = int(not pos) 
      return JsonResponse(res,safe=False)
    except IntegrityError as e:
      id = int(request.POST['id'])
      pos = bool(int(request.POST['positive']))
      vote = Vote.objects.get(user=request.user.id,video=id)
      bef = vote.positive
      vote.positive = pos
      vote.save()
      res = {}
      res["positive"] = int(pos) - int(bef)
      res["negative"] = int(not pos) - int(not bef)
      return JsonResponse(res,safe=False)
    except Vote.MultipleObjectsReturned as e:
      pass
    except Vote.DoesNotExist as e:
      pass
    except ValueError as e:
      pass

  res = {}
  res["positive"] = 0
  res["negative"] = 0
  return JsonResponse(res,safe=False)
