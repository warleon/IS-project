from .models import Video, Related
from django.http import JsonResponse

def get_video_by_title(request):
  segment = request.GET.get('title')
  if(len(segment)):
    videos = Video.objects.filter(title__icontains=segment)
    return JsonResponse(list(videos.values()), safe=False)
  else:
    return JsonResponse([], safe=False)

def get_dependecies_from_video_id(request):
  id = request.GET.get('id')
  relations = Related.objects.filter(video_01=id)
  return JsonResponse(list(videos.values()), safe=False)
