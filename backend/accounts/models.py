"""Accounts models."""
# Django
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """Custom user model."""

    phone_number = models.CharField(
        max_length=9,
        null=True,
        blank=True,
    )

    avatar = models.ImageField(null=True, blank=True, upload_to='images')
    email = models.EmailField('email address', unique=True)
    is_trainer = models.BooleanField(
        'Trener',
        default=False,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):  # noqa: D105
        return self.username

    def avatar_url(self):
        """Get avatar url."""
        if self.avatar:
            return self.avatar.url
        return None
