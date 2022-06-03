from django.shortcuts import render

def index(request):
    return render(request,'index.html')


def login(request):
    template = loader.get_template('login.html')
    return HttpResponse(template.render({},request))
    #return render(request,'login.html')

def register(request):
    template = loader.get_template('register.html')
    return HttpResponse(template.render({},request))