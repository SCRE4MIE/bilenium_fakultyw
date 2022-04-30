"""API permissions."""
# 3rd-party
from rest_framework import permissions


class IsTrainer(permissions.BasePermission):
    """Trainer permission."""

    def has_permission(self, request, view):  # noqa: D102
        return request.user.is_trainer


class IsDogOwner(permissions.BasePermission):
    """Dog owner permission."""

    def has_object_permission(self, request, view, obj):  # noqa: D102
        return request.user == obj.owner
