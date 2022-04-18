"""API url config."""
# Django
from django.urls import path

# Project
from .views import CustomUserCreate, BlacklistTokenView

app_name = 'user'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name='create_user'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),

]
