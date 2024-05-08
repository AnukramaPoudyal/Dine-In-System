# signup/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('register/', views.add_registration, name='add_registration'),  # Example path
    path('list/', views.list_registrations, name='list_registrations'),

]
