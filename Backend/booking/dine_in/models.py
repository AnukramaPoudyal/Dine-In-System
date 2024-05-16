from django.db import models
from django.conf import settings
from datetime import datetime, date
from django.utils import timezone


class User(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    contact = models.CharField(max_length=255, default='')



class Reservation(models.Model):
    # ForeignKey to link to a User who made the reservation
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    # firstname = models.CharField(max_length=255,default='')
    # lastname = models.CharField(max_length=255,default='')
    occasion_type = models.CharField(max_length=50)  # E.g., Birthday, Wedding
    number_of_people = models.PositiveSmallIntegerField(default=1)
    table_num = models.PositiveSmallIntegerField(default=1)
    SITTING_CHOICES = [
        ('indoor', 'Indoor'),
        ('outdoor', 'Outdoor'),
    ]
    sitting_space = models.CharField(max_length=7, choices=SITTING_CHOICES,default='')
    res_date = models.DateField(default=date.today)  # Date and time of the reservation
    res_time = models.TimeField(default=timezone.now)
    STATUS_CHOICES = [
        ('confirm', 'Confirm'),
        ('cancel', 'Cancel'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='confirm')
    
    # def is_valid_datetime(datetime_str):
    #  try:
    #      # Parse the datetime string
    #      datetime_obj = datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
    #      # Optionally, you can check if the datetime is in the future to ensure it's not a past datetime
    #      if datetime_obj < timezone.now():
    #          return False
    #      return True
    #  except ValueError:
    #      return False
