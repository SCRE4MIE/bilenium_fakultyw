"""Accounts admin."""
# Django
from django.contrib import admin

# Local
from .models import CustomUser


@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = [
        'pk',
        'username',
        'email',
        'first_name',
        'last_name',
        'is_active',
        'is_trainer',
    ]

    search_fields = [
        'email',
        'username',
    ]
