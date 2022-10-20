from django.urls import path
from .views import hats_detail, hats_list, location_list

urlpatterns = [
    path('hats/', hats_list, name='hats_list'),
    path('hats/<int:pk>/', hats_detail, name='hats_detail'),
    path('location/', location_list, name='location_list'),
]
