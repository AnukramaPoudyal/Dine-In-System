from django.shortcuts import render
from dine_in.models import User, Reservation
import random
from datetime import datetime, timedelta

# Create your views here.
def index(request):
    context = {'name': "subhikshya",
               "age": 13*2
               }
    # return render(request, 'index.html', context)
    return render(request, 'homepage.html', context)


def reserve(request):
    context = {}
    return render(request, 'reserve.html', context)


def booking(request):
    context = {}
    results = Reservation.objects.all()
    if request.user.is_authenticated:
        results = results.filter(user=request.user)
    res = results.latest('id') # assuming latest id is the latest reserved
    booked_table = Reservation.objects.values_list('table_num', flat=True)
    # find tables that aren't booked (assuming 20 tables)
    empty_table = list(set(range(20)) - set(booked_table))
    if len(empty_table) and not res.table_num:
        res.table_num = random.choice(empty_table)
        res.save()
        """
        else:
            time_before = res.res_time - timedelta(hours=1, minutes=0)
            time_after = res.res_time + timedelta(hours=1, minutes=0)
            if time_before not in Reservation.objects.values_list('table_num', flat=True):
                context['avail_before'] = time_before
            if time_after not in Reservation.objects.values_list('table_num', flat=True):
                context['time_after'] = time_after
        """
    context['res'] = res
    return render(request, 'booking.html', context)
