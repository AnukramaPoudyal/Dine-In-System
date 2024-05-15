# signup/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("signup/", views.signup, name="signup"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path('summary/', views.dashboard_summary, name='dashboard_summary'),
    path("find-reservation/", views.find_reservation, name="find_reservation"),  # Example path
    path("reserve/", views.add_reservation, name="add_reservation"),  # Example path
    path("list/", views.list_reservations, name="list_reservations"),
    path("list-all/", views.list_all_reservations, name="list_all_reservations"),
    path("add-table/", views.add_table, name="add_table"),
]

