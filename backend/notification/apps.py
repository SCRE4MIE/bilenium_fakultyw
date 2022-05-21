"""Notification apps."""

# Django
from django.apps import AppConfig


class NotificationConfig(AppConfig):  # noqa: D101
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notification'
