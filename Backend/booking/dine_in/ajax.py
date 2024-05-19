from dine_in.models import User, Reservation
from django.http import HttpResponse, JsonResponse
import pytz
from datetime import datetime

tz = pytz.timezone("Asia/Kathmandu")


def book_table(request):
    response_data = {}
    # print('yo')
    num_people = request.GET.get('num_people')
    res_date = request.GET.get('date')
    res_time = request.GET.get('time')
    res_type = request.GET.get('stype')
    # res_date = tz.localize(datetime.strptime(res_date, "%Y-%m-%d"))
    reservation = Reservation(
        number_of_people=num_people,
        sitting_space=res_type,
        res_date = res_date,
        res_time=res_time,
        status="confirm",  # Default to confirm
    )
    if request.user.is_authenticated:
        reservation.user = request.user
    reservation.save()
    # print('success')
    # print(Reservation.objects.all())


    response_data['success'] = True
    return JsonResponse(response_data)
