from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    phone_number = models.CharField(
        max_length=9,
        null=True,
        blank=True,
    )

    avatar = models.ImageField(null=True, blank=True)
    email = models.EmailField('email address', unique=True)
    is_trainer = models.BooleanField(
        'Trener',
        default=False,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        return None

