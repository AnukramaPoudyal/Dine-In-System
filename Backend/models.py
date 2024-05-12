from django.db import models
from django.conf import settings
from django.utils import timezone

class User(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    contact = models.CharField(max_length=255, default='')

class UserLogin(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    login_time = models.DateTimeField(default=timezone.now)

class Registration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    occasion_type = models.CharField(max_length=50)
    number_of_people = models.IntegerField()
    date_time = models.DateTimeField()
    STATUS_CHOICES = [
        ('confirm', 'Confirm'),
        ('cancel', 'Cancel'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='confirm')

    def __str__(self):
        return f"{self.occasion_type} for {self.user.firstname} on {self.date_time.strftime('%Y-%m-%d %H:%M')}"
