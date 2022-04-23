"""API url config."""
# Django
from django.urls import path

# Project
from api.views import DogsListView
from api.views import GetTrainerView
from api.views import TrainersListView

app_name = 'api_v1'
# urlpatterns = [
#     path('auth/', include('rest_auth.urls')),
#     path('rest-auth/registration/', include('rest_auth.registration.urls')),
# ]
urlpatterns = [
    path('trainers-list/', TrainersListView.as_view(), name='trainers_list'),
    path('get-trainer/<int:pk>/', GetTrainerView.as_view(), name='get_trainer'),
    path('get-dog-list/', DogsListView.as_view(), name='get_dogs_list'),
]
