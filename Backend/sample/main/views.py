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

            # Validate email and retrieve the user
            if not is_valid_email(email):
                return JsonResponse({"error": "Invalid email format"}, status=400)

            user = usermodel.User.objects.get(email=email)

            # Check if the provided password matches the stored hashed password
            # print(check_password(password,user.password))
            if password != user.password:
                return JsonResponse({"error": "Invalid credentials"}, status=401)

            login = usermodel.Logins(user=user)
            login.save()

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
def dashboard_summary(request):
    if request.method == "GET":
        user_count = usermodel.User.objects.count()
        dine_table_count = usermodel.DineTable.objects.count()
        login_count = usermodel.Logins.objects.count()
        reservation_count = usermodel.Reservation.objects.count()

        return JsonResponse(
            {
                "user_count": user_count,
                "dine_table_count": dine_table_count,
                "login_count": login_count,
                "reservation_count": reservation_count,
            }
        )

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        contact = data.get("contact")
        # confirm_password = data.get("confirm_password")

        if is_valid_email(email):
            user = usermodel.User(
                firstname=first_name,
                lastname=last_name,
                contact=contact,
                email=email,
                password=password,
            )
            user.save()
            # user = User(firstname = first_name, lastname = last_name, email = email,password = password,)
            # user.save()
            return JsonResponse({"message": "Signup successful!"})
        return JsonResponse({"error": "Invalid-email"})

    return JsonResponse({"error": "Invalid-parameters"})


@csrf_exempt
def add_table(request):
    if request.method == "POST":
        data = json.loads(request.body)
        table_number = data.get("table_number")
        sitting_space = data.get("sitting_space")
        max_people = data.get("max_people")

        dineTable = usermodel.DineTable(
            table_number=table_number,
            sitting_space=sitting_space,
            max_people=max_people,
        )
        dineTable.save()
        return JsonResponse({"message": "Table added successfully!"})
    else:
        return JsonResponse({"error": "Invalid request method"})


def is_valid_email(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None


@csrf_exempt
def dashboard(request):
    # Fetch all users or a specific subset, depending on your use case
    users = usermodel.User.objects.all()  # Retrieve all user details

    # Create a list of dictionaries, each containing the details of a user
    user_list = list(users.values('firstname', 'lastname', 'email', 'contact'))

    # Return the list of users as a JSON response
    return JsonResponse(user_list, safe=False)


@csrf_exempt
def get_user_reservation(request):
    user_reservations = usermodel.Reservation.objects.all()
    data = []
    for reservation in user_reservations:
        data.append({
            'occassion_type': reservation.occassion_type,
            'status': reservation.status,
            # Add other fields here
        })
    # Return the list of users as a JSON response
    return JsonResponse(data, safe=False)

# yugeen's reservation part


@csrf_exempt
def find_reservation(request):
    if request.method == "POST":
        try:
            # Extract email from POST request and strip whitespace
            data = json.loads(request.body)
            print(data)

            # Default to empty string if None
            email = data.get("email", "").strip()

            if not email:
                return JsonResponse({"error": "Email is required"}, status=400)

            # Retrieve the user by email
            user = usermodel.User.objects.filter(email=email).first()
            print(user)
            if not user:
                return JsonResponse({"error": "User not found"}, status=404)

            number_of_people = int(data.get("number_of_people"))

            dineTable = usermodel.DineTable.objects.filter(
                max_people__gte=number_of_people
            )
            print(dineTable)
            if not dineTable.exists():
                return JsonResponse({"error": "Table not found"}, status=404)

            selectedTable = dineTable.first()
            print(selectedTable)

            # Get other required data from POST request
            occasion_type = data.get("occassion", "").strip()
            date_time_str = data.get("date_time")
            print(occasion_type, number_of_people, date_time_str)

            # Convert date_time_str to a valid datetime
            date_time = datetime.datetime.strptime(
                date_time_str, "%Y-%m-%d %H:%M:%S")
            sitting_space = data.get("sitting_space", "").strip()

            print(date_time)
            print(sitting_space)

            # add logic if any table is empty for the time or not
            table_present = False
            for table in dineTable:
                print(table)
                reservation_exists = usermodel.Reservation.objects.filter(
                    table=table, date_time=date_time
                )
                if not reservation_exists.exists():
                    selectedTable = table
                    table_present = True
                    break
                else:
                    print("table is booked")

            print(table_present)

            if not table_present:
                return JsonResponse({"error": "All tables are booked"}, status=404)

            return JsonResponse({"message": "Table found!"}, status=201)

        except ValueError:
            return JsonResponse({"error": ValueError}, status=400)

        except Exception as e:
            print("Error adding reservation: %s", e)
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def add_table(request):
    if request.method == "POST":
        data = json.loads(request.body)
        table_number = data.get("table_number")
        sitting_space = data.get("sitting_space")
        max_people = data.get("max_people")

        dineTable = usermodel.DineTable(
            table_number=table_number,
            sitting_space=sitting_space,
            max_people=max_people,
        )
        dineTable.save()
        return JsonResponse({"message": "Table added successfully!"})
    else:
        return JsonResponse({"error": "Invalid request method"})


def is_valid_email(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None


# yugeen's reservation part
@csrf_exempt
def add_reservation(request):
    if request.method == "POST":

        try:
            # Extract email from POST request and strip whitespace
            data = json.loads(request.body)
            print(data)
            # Default to empty string if None
            email = data.get("email", "").strip()

            if not email:
                return JsonResponse({"error": "Email is required"}, status=400)

            # Retrieve the user by email
            user = usermodel.User.objects.filter(email=email).first()
            print(user)
            if not user:
                return JsonResponse({"error": "User not found"}, status=404)

            number_of_people = int(data.get("number_of_people"))
            print(number_of_people)

            dineTable = usermodel.DineTable.objects.filter(
                max_people__gte=number_of_people
            )
            print(dineTable)

            if not dineTable.exists():
                return JsonResponse({"error": "Table not found"}, status=404)

            selectedTable = dineTable.first()
            print(selectedTable)

            # Get other required data from POST request
            occasion_type = data.get("occassion", "").strip()
            date_time_str = data.get("date_time")
            print(occasion_type, number_of_people, date_time_str)

            # Convert date_time_str to a valid datetime
            date_time = datetime.datetime.strptime(
                str(date_time_str), "%Y-%m-%d %H:%M:%S")
            sitting_space = data.get("sitting_space", "").strip()

            print(date_time)
            print(sitting_space)
            print(occasion_type)
            print("************")

            sitting_space_code = 1
            if sitting_space == "Outdoor":
                sitting_space_code = 2

            # add logic if any table is empty for the time or not
            table_present = False
            for table in dineTable:
                print(table)
                reservation_exists = usermodel.Reservation.objects.filter(
                    table=table, date_time=date_time
                )
                if not reservation_exists.exists():
                    selectedTable = table
                    table_present = True
                    break
                else:
                    print("table is booked")

            if not table_present:
                return JsonResponse({"error": "All tables are booked"}, status=404)

            # Create and save a new reservation
            reservation = usermodel.Reservation(
                user=user,
                table=selectedTable,
                occasion_type=occasion_type,
                number_of_people=number_of_people,
                sitting_space=sitting_space_code,
                date_time=date_time,
                status="confirm",  # Default to confirm
            )

            reservation.save()  # Save to database

            return JsonResponse({"message": "Reservation successful!"}, status=201)

        except ValueError:
            return JsonResponse({"error": "Invalid data format"}, status=400)

        except Exception as e:
            print("Error adding reservation: %s", e)
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


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
                "date_time": reg.date_time.strftime("%Y-%m-%d %H:%M"),
                "status": reg.status,
            }
            for reg in reservations
        ]

        return JsonResponse({"reservations": result})

    return JsonResponse({"error": "Invalid request method"}, status=400)


@csrf_exempt
def list_all_reservations(request):
    if request.method == "GET":

        reservations = usermodel.Reservation.objects.all()
        result = [
            {
                "customer_name": reg.user.firstname+" "+reg.user.lastname,
                "customer_email": reg.user.email,
                "occasion_type": reg.occasion_type,
                "number_of_people": reg.number_of_people,
                "date_time": reg.date_time.strftime("%Y-%m-%d %H:%M"),
                "status": reg.status,
            }
            for reg in reservations
        ]

        return JsonResponse({"reservations": result})

    return JsonResponse({"error": "Invalid request method"}, status=400)
