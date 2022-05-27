from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def index(request):
    #return render(request,'index.html')
    template = loader.get_template('index.html')
    return HttpResponse(template.render({},request))
    #return HttpResponse("HOLA")