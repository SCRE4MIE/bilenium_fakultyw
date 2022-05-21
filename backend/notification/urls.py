"""Notification urls."""

# Django
from django.urls import path

# 3rd-party
from notification.views import WalkNotificationCountView
from notification.views import WalkNotificationView

app_name = 'notification'

urlpatterns = [

    path('get-notification/', WalkNotificationView.as_view(), name='get_notification'),
    path(
        'get-notification-count/',
        WalkNotificationCountView.as_view(),
        name='get_notification_count',
    ),
]
