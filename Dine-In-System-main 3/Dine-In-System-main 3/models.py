from django.db import models

class User(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)
  email = models.EmailField(unique=True)
  password = models.CharField(max_length=255)
  contact = models.CharField(max_length=255, default='')
  confirm_password = models.CharField(max_length=255, default='')
