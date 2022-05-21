"""Notification admin."""

# Django
from django.contrib import admin

# 3rd-party
from notification.models import WalkNotification
from notification.models import WalkNotifiCustomUser


@admin.register(WalkNotification)
class WalkNotificationAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = [
        'pk',
        'action',
    ]


@admin.register(WalkNotifiCustomUser)
class WalkNotifiCustomUserAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = [
        'pk',
    ]
