"""API url config."""
# Django
from django.urls import include
from django.urls import path

# Project
from api.views import GetTrainersListView

app_name = 'api_v1'
# urlpatterns = [
#     path('auth/', include('rest_auth.urls')),
#     path('rest-auth/registration/', include('rest_auth.registration.urls')),
# ]
urlpatterns = [
    path('get-trainers-list/', GetTrainersListView.as_view(), name='get_trainers_list'),
]
