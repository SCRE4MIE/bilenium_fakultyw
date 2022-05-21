"""Notification models."""

# Django
from django.db import models

# 3rd-party
from accounts.models import CustomUser


class WalkNotification(models.Model):
    """Walk notification."""

    action = models.CharField(
        max_length=255,
    )

    walk_start_date = models.DateTimeField()

    targets_ids = models.ManyToManyField(CustomUser, through='WalkNotifiCustomUser')

    def __str__(self):  # noqa: D105
        return self.action

    class Meta:  # noqa: D106
        verbose_name = 'Powiadomienia spacery'
        verbose_name_plural = 'Powiadomienia spacery'


class WalkNotifiCustomUser(models.Model):
    """Walk notification custom m2m field."""

    walk_notification = models.ForeignKey(
        WalkNotification,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
    )

    user = models.ForeignKey(
        CustomUser,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
    )

    is_displayed = models.BooleanField(default=False)
