"""API url config."""
# Django
from django.urls import path

# Project
from api.views import AddRating, WalksList, TrainersWalksList
from api.views import CheckTrainerInWalk
from api.views import CreateDogView
from api.views import CreateWalk
from api.views import DogsListView
from api.views import GetTrainerView
from api.views import GetUpdateDeleteDog
from api.views import TrainersListView
from api.views import UpdateWalk
from api.views import UsersDogsListForTrainerView
from api.views import UsersDogsListView

app_name = 'api_v1'

urlpatterns = [
    path('trainers-list/', TrainersListView.as_view(), name='trainers_list'),
    path('get-trainer/<int:pk>/', GetTrainerView.as_view(), name='get_trainer'),
    path('get-dog-list/', DogsListView.as_view(), name='get_dogs_list'),
    path('get-update-del-dog/<int:pk>/', GetUpdateDeleteDog.as_view(), name='get_update_del_dog'),
    path('create-dog/', CreateDogView.as_view(), name='create_dog'),
    path('users-dog-list/', UsersDogsListView.as_view(), name='users_dog_list'),
    path(
        'users-dog-list-for-trainer/<int:pk>/',
        UsersDogsListForTrainerView.as_view(),
        name='users_dog_list',
    ),
    path('add-rating/', AddRating.as_view(), name='add_rating'),
    path('create-walk/', CreateWalk.as_view(), name='create_walk'),
    path('update-walk/<int:pk>/', UpdateWalk.as_view(), name='update_walk'),
    path('check_trainer_in_walks/', CheckTrainerInWalk.as_view(), name='check_trainer_in_walks'),
    path('walks-list/', WalksList.as_view(), name='walks_list'),
    path('trainer-walks-list/<int:pk>/', TrainersWalksList.as_view(), name='trainers_walks_list'),
]
