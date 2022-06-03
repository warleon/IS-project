from django.shortcuts import render, redirect
from django.contrib import messages 
from django.contrib.auth.models import auth
from .models import User

from django.contrib.auth import logout

def index(request):
    return render(request,'index.html')

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('home')
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
                return redirect('register')
            elif User.objects.filter(email=email).exists():
                messages.info(request, 'Email Taken')
                return redirect('register')
            else:
                user = User.objects.create(username=username, password=password1, email=email)
                user.save()
                print("User created")
                return redirect('BigTeta:login')
        else:
            messages.info(request, 'password not matched!')
            return redirect('register')
    else:
        return render(request, 'register.html')

def logout_user(request):
    logout(request)
    messages.success(request,('Youre now logged out'))
    return redirect('BigTeta:home')