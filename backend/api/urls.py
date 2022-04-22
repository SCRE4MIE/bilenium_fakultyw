"""API url config."""
# Django
from django.urls import include
from django.urls import path

# Project
from api.views import TrainersListView

app_name = 'api_v1'
# urlpatterns = [
#     path('auth/', include('rest_auth.urls')),
#     path('rest-auth/registration/', include('rest_auth.registration.urls')),
# ]
urlpatterns = [
    path('trainers-list/', TrainersListView.as_view(), name='trainers_list'),
]
