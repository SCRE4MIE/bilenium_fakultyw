"""API url config."""
# Django
from django.urls import path

# Local
from .views import BlacklistTokenView
from .views import CustomUserCreate
from .views import UserDetailView
from .views import UserProfileEdit
from .views import UsersList

app_name = 'user'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('get-user-details/', UserDetailView.as_view(), name='get_user_details'),
    path('edit-user-profile/', UserProfileEdit.as_view(), name='edit_user_profile'),
    path('users-list/', UsersList.as_view(), name='users_list'),
]
