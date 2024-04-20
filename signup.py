import re
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import sample.user.models as usermodel

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        confirm_password = data.get("confirm_password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        contact_number = data.get("contact_number")  

        if password != confirm_password:
            return JsonResponse({"error": "Passwords do not match"})

        if is_valid_email(email):
            user = usermodel.User(firstname=first_name, lastname=last_name, email=email, password=password, contact_number=contact_number)  
            user.save()
            return JsonResponse({"message": "Signup successful!"})
        return JsonResponse({"error": "Invalid email format"})
    return JsonResponse({"error": "Invalid request method"})

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None
