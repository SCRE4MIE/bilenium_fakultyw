"""API permissions."""
# 3rd-party
from rest_framework import permissions


class TrainersWorkDaysIsOwner(permissions.BasePermission):
    """Trainer work days instance owner."""

    def has_object_permission(self, request, view, obj):  # noqa: D102
        return request.user == obj.trainer
