"""Notification urls."""

# Django
from django.urls import path

# 3rd-party
from notification.views import WalkNotificationView

app_name = 'user'

urlpatterns = [

    path('get-notification/', WalkNotificationView.as_view(), name='get_notification'),
]
