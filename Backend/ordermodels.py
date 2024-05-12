from django.db import models

class Order(models.Model):
    customer_name = models.CharField(max_length=100)
    order_details = models.TextField()
    table_number = models.IntegerField()
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"Order #{self.pk} - {self.customer_name}"
