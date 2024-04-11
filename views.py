# signup/views.py

from django.shortcuts import render
from django.http import JsonResponse
import re

def login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        if is_valid_email(email):
            # connect with database for checking valid details
            # For simplicity, let's just return a success message
            return JsonResponse({"message": "Login successful!"})
        return  JsonResponse({"error": "Invalid-email"})

    return JsonResponse({"error": "Invalid-parameters"})

def signup(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user_name = request.POST.get("user_name")
        if is_valid_email(email):
            # insert data into database
            # For simplicity, let's just return a success message
            return JsonResponse({"message": "Signup successful!"})
        return  JsonResponse({"error": "Invalid-email"})

    return JsonResponse({"error": "Invalid-parameters"})


def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None