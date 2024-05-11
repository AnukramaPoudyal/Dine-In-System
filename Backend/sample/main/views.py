# main/views.py

from django.shortcuts import render
from django.http import JsonResponse
import re
from django.db import models
from django.views.decorators.csrf import csrf_exempt
import json
import sample.user.models as usermodel
import datetime

@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            
            print(email)
            print(password)
            # Validate email and retrieve the user
            if not is_valid_email(email):
                return JsonResponse({"error": "Invalid email format"}, status=400)
            
            user = usermodel.User.objects.get(email=email)
            
            # Check if the provided password matches the stored hashed password
            # print(check_password(password,user.password))
            if password != user.password:
                return JsonResponse({"error": "Invalid credentials"}, status=401)
            
            return JsonResponse(status=200, data={"message": "Login successful"})
        
        except usermodel.User.DoesNotExist:
            return JsonResponse({"error": "No user exists with this email"}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        
        except Exception as e:
            # Handle unexpected errors and log them
            return JsonResponse({"error": "An error occurred"}, status=500)
    
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        contact = data.get("contact_number")
        # confirm_password = data.get("confirm_password")

        print(email)
        if is_valid_email(email):
            user = usermodel.User(firstname = first_name, lastname = last_name,contact = contact, email = email,password = password)
            user.save()
            # user = User(firstname = first_name, lastname = last_name, email = email,password = password,)
            # user.save()
            return JsonResponse({"message": "Signup successful!"})
        return  JsonResponse({"error": "Invalid-email"})

    return JsonResponse({"error": "Invalid-parameters"})

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

@csrf_exempt
def dashboard(request):
    # Fetch all users or a specific subset, depending on your use case
    users = usermodel.User.objects.all()  # Retrieve all user details

    # Return the data to the template
    return render(request, 'dashboard.html', {'users': users})

# yugeen's reservation part
@csrf_exempt
def add_reservation(request):
    if request.method == "POST":
        try:
            # Extract email from POST request and strip whitespace
            data = json.loads(request.body)
            print(data)
            email = data.get("email", "").strip()  # Default to empty string if None

            if not email:
                logger.info("Received POST request with email: %s", email)  # Log the email for debugging
                return JsonResponse({"error": "Email is required"}, status=400)

            # Retrieve the user by email
            user = usermodel.User.objects.filter(email=email).first()
            print(user)
            if not user:
                return JsonResponse({"error": "User not found"}, status=404)

            # Get other required data from POST request
            occasion_type = data.get("occasion_type", "").strip()
            number_of_people = int(data.get("number_of_people"))
            date_time_str = data.get("date_time")
            print(occasion_type, number_of_people, date_time_str)
            # Convert date_time_str to a valid datetime
            date_time = datetime.datetime.fromisoformat(date_time_str)
            sitting_space = data.get("sitting_space", "").strip()
            # Create and save a new reservation
            reservation = usermodel.Reservation(
                user=user,
                occasion_type=occasion_type,
                number_of_people=number_of_people,
                sitting_space=1,
                date_time=date_time,
                status="confirm",  # Default to confirm
            )

            reservation.save()  # Save to database

            return JsonResponse({"message": "Reservation successful!"}, status=201)

        except ValueError:
            return JsonResponse({"error": "Invalid data format1"}, status=400)

        except Exception as e:
            print("Error adding reservation: %s", e)
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)

    return JsonResponse({"error": "Invalid request method2"}, status=405)    
    
# New view for listing reservations
@csrf_exempt
def list_reservations(request):
    if request.method == "GET":
        email = request.GET.get("email")
        user = usermodel.User.objects.filter(email=email).first()
        
        print(email)
        print(usermodel.User.objects.filter(email=email).first())
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        reservations = usermodel.Reservation.objects.filter(user=user)
        result = [
            {
                "occasion_type": reg.occasion_type,
                "number_of_people": reg.number_of_people,
                # "date_time": reg.date_time.strftime("%Y-%m-%d %H:%M"),
                "status": reg.status,
            }
            for reg in reservations
        ]

        return JsonResponse({"reservations": result})

    return JsonResponse({"error": "Invalid request method"}, status=400)

