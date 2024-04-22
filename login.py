from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.hashers import make_password, check_password
from .models import User

@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        
        if not email or not password:
            return JsonResponse({"error": "Invalid parameters"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)

        if not check_password(password, user.password):
            return JsonResponse({"error": "Invalid credentials"}, status=400)

        if not user.is_active:
            return JsonResponse({"error": "User account is not active"}, status=400)

        if not user.signup_completed:
            return JsonResponse({"error": "User signup process is not completed"}, status=400)

        return JsonResponse({"message": "Login successful"})
    
    return JsonResponse({"error": "Invalid method"}, status=405)
