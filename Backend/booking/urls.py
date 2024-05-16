from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('dine/', include('dine_in.urls')),
    path('reserve/', views.reserve, name='reserve'),
    path('booking/', views.booking, name='booking'),
    path('admin/', admin.site.urls),
]
