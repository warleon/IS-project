from email import message
from django.shortcuts import render, redirect
from django.contrib import messages 
from django.contrib.auth.models import User, auth
from django.conf import settings 
import os

from django.contrib.auth import logout
from django.db.utils import IntegrityError

import subprocess

from .models import Video, Related
from .forms import DocumentForm
import logging

logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def index(request):
    return render(request,'index.html')

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(request, username=username, password=password)
        # user = User.objects.filter(username=username)
        if user is not None:
            auth.login(request, user)
            messages.info(request, 'Username Auth')
            return redirect('BigTeta:home')
        else:
            messages.info(request, "Invalid Username or Password")
            return redirect('BigTeta:login')
    else:
        return render(request, 'login.html')

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        if password1 == password2:
            if User.objects.filter(username=username).exists():
                messages.info(request, 'Username Taken')
                return redirect('BigTeta:register')
            elif User.objects.filter(email=email).exists():
                messages.info(request, 'Email Taken')
                return redirect('BigTeta:register')
            else:
                user = User.objects.create_user(username=username, password=password1, email=email)
                user.save()
                print("User created")
                return redirect('BigTeta:login')
        else:
            messages.info(request, 'password not matched!')
            return redirect('BigTeta:register')
    else:
        return render(request, 'register.html')

def logout_user(request):
    logout(request)
    messages.success(request,('Youre now logged out'))
    return redirect('BigTeta:home')

def show_video(request):
    vidid = request.GET.get('id')
    
    video = Video.objects.get(pk=vidid)

    return render(request, 'showVideo.html',{"url":settings.MEDIA_URL+video.docfile.name, "video": video})

def upload(request):
    # Handle file upload
    if request.user.is_authenticated:
        if request.method == 'POST':
            title = request.POST['title']
            description = request.POST['description']
            form = DocumentForm(request.POST, request.FILES)
            if form.is_valid():
                dependencies = request.POST.getlist("dependency")
                newdoc = Video(title=title,docfile = request.FILES['docfile'], author=request.user, description=description)
                newdoc.save()
                #run split command and save results
                doc_rel_path = newdoc.docfile.name
                doc_name = os.path.basename(doc_rel_path)
                doc_abs_path =os.path.join(settings.MEDIA_ROOT , doc_rel_path)
                command = "ffmpeg -i {0} -f segment -segment_time 5.0 -segment_list {0}.m3u8 -vcodec copy {0}_%d.ts".format(doc_abs_path)
                subprocess.run(command,shell=True, check=True)
                newdoc.docfile.name = doc_rel_path+".m3u8"
                newdoc.save()
                # Create dependencies
                for dependency in dependencies:
                    try:
                        id = int(dependency)
                        logger.info("Found dependency id: %s", id)
                        video_2 = Video.objects.get(pk=id)
                        relation = Related(video_01 = newdoc, video_02 = video_2)
                        relation.save()
                    except ValueError as e:
                        logger.error(e)
                    except Video.DoesNotExist as e:
                        logger.error(e)
                    except IntegrityError as e:
                        logger.error(e)
                        


                # Redirect to the document showFiles after POST
                return redirect('BigTeta:showFiles')
        else:
            form = DocumentForm() # A empty, unbound form

        # Load documents for the showFiles page
        documents = Video.objects.all()
        # Render showFiles page with the documents and the form
        return render(request,'upload.html', {'documents': documents, 'form': form})

    return redirect('BigTeta:home')

def showFiles(request):
    documents = Video.objects.all()
    # Render showFiles page with the documents and the form
    return render(request,'showFiles.html',{'documents': documents})

def prueba(request):
    return render(request,'prueba.html')
