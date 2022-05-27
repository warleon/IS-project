from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
    return render(request,'index.html')
    #template = loader.get_template('index.html')
    #return HttpResponse(template.render({},request))
    #return HttpResponse("HOLA")


def login(request):
    template = loader.get_template('login.html')
    return HttpResponse(template.render({},request))
    #return render(request,'login.html')

def register(request):
    template = loader.get_template('register.html')
    return HttpResponse(template.render({},request))