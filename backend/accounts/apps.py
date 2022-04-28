"""Accounts apps."""
# Django
from django.apps import AppConfig


class AccountsConfig(AppConfig):  # noqa: D101
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'
