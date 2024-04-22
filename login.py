from django.shortcuts import render
from django.http import JsonResponse
import re
from django.db import models
from django.views.decorators.csrf import csrf_exempt
import json
import sample.user.models as usermodel

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        if is_valid_email(email):
            user = usermodel.User.objects.get(email=email,password=password)
            print(user)
            if user is None:
                return JsonResponse({"error": "No user exists"})
            # connect with database for checking valid details
            # For simplicity, let's just return a success message
            return JsonResponse({"message": "Login successful"})
        return  JsonResponse({"error": "Invalid-email"})

    return JsonResponse({"error": "Invalid-parameters"})
