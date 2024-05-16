from django.contrib import admin
from django.urls import path, include
from . import views, ajax

urlpatterns = [
    path('', views.index, name='index'),
    



    path("dine/ajax/add-reserve/",
        ajax.book_table, name="add_reserve"),
]