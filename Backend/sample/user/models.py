from django.db import models
from django.conf import settings
from datetime import datetime


class User(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    contact = models.CharField(max_length=255, default="")


class DineTable(models.Model):
    table_number = models.IntegerField()
    SITTING_CHOICES = [
        ("indoor", "Indoor"),
        ("outdoor", "Outdoor"),
    ]
    sitting_space = models.CharField(max_length=7, choices=SITTING_CHOICES, default="")
    max_people = models.IntegerField()


class Logins(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)


class Reservation(models.Model):
    # ForeignKey to link to a User who made the reservation
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    table = models.ForeignKey(DineTable, on_delete=models.CASCADE, null=True)
    occasion_type = models.CharField(max_length=50)  # E.g., Birthday, Wedding
    number_of_people = models.IntegerField(default=1)
    SITTING_CHOICES = [
        ("indoor", "Indoor"),
        ("outdoor", "Outdoor"),
    ]
    sitting_space = models.CharField(max_length=7, choices=SITTING_CHOICES, default="")
    date_time = models.DateTimeField(
        blank=True, null=True
    )  # Date and time of the reservation
    STATUS_CHOICES = [
        ("confirm", "Confirm"),
        ("cancel", "Cancel"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="confirm")

    def is_valid_datetime(datetime_str):
        try:
            # Parse the datetime string
            datetime_obj = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
            # Optionally, you can check if the datetime is in the future to ensure it's not a past datetime
            if datetime_obj < timezone.now():
                return False
            return True
        except ValueError:
            return False

class PaymentOption(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('CARD', 'Card Payment'),
        ('ONLINE', 'Online Payment')
    ]
    method = models.CharField(max_length=10, choices=PAYMENT_METHOD_CHOICES)
    card_number = models.CharField(max_length=16, blank=True, null=True)
    expiry_date = models.DateField(blank=True, null=True)
    cvv = models.CharField(max_length=4, blank=True, null=True)
    online_method = models.CharField(max_length=20, choices=[
        ('MOBILE_BANKING', 'Mobile Banking'),
        ('ESEWA', 'eSewa'),
        ('KHALTI', 'Khalti')
    ], blank=True, null=True)

    def __str__(self):
        if self.method == 'CARD':
            return f"Card Payment - {self.card_number}"
        elif self.method == 'ONLINE':
            return f"Online Payment - {self.get_online_method_display()}"
        else:
            return "Unknown Payment Method"
