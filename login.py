from django.shortcuts import render
from django.http import JsonResponse
import re
from django.db import transaction  # Import transaction module
import json
import sample.user.models as usermodel

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            with transaction.atomic():  # Use atomic transaction to ensure data integrity
                data = json.loads(request.body)
                email = data.get("email")
                password = data.get("password")
                if is_valid_email(email):
                    try:
                        user = usermodel.User.objects.get(email=email, password=password)
                        if user:
                            # User authentication successful
                            return JsonResponse({"message": "Login successful"})
                        else:
                            # User authentication failed
                            return JsonResponse({"error": "Invalid credentials"})
                    except usermodel.User.DoesNotExist:
                        # User does not exist
                        return JsonResponse({"error": "User does not exist"})
               else:
                    # Invalid email format
                    return JsonResponse({"error": "Invalid email format"})
        except Exception as e:
            # Log any exceptions that occur during the login process
            print(f"Error during login: {e}")
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)

    else:
        # Invalid HTTP method
        return JsonResponse({"error": "Invalid method"}, status=405)
