"""APi apps."""
# Django
from django.apps import AppConfig


class ApiConfig(AppConfig):  # noqa: D101
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
