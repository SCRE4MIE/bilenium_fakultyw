"""Notification serializers."""
# 3rd-party
from notification.models import WalkNotification
from notification.models import WalkNotifiCustomUser
from rest_framework import serializers


class WalkNotificationSerializer(serializers.ModelSerializer):
    """WalkNotification serializer."""

    class Meta:  # noqa: D106
        model = WalkNotification
        fields = ['pk', 'action', 'walk_start_date']


class WalkNotifiCustomUserSerializer(serializers.ModelSerializer):
    """WalkNotifiCustomUser serializer."""

    walk_notification = WalkNotificationSerializer()

    class Meta:  # noqa: D106
        model = WalkNotifiCustomUser
        fields = ['pk', 'walk_notification']
