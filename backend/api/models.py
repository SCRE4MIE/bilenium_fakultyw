"""Api models."""
# Django
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator
from django.db import models

# 3rd-party
from accounts.models import CustomUser


class Rating(models.Model):
    """Rating model."""

    value = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
    )

    comment = models.CharField(max_length=255)

    trainer = models.ForeignKey(
        CustomUser,
        related_name='rating_trainer',
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
    )

    def __str__(self):  # noqa: D105
        return self.trainer.first_name + ' ' + self.trainer.last_name

    class Meta:  # noqa: D106
        verbose_name = 'Ocena'
        verbose_name_plural = 'Oceny'


class Dog(models.Model):
    """Dog model."""

    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )
    breed = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )
    avatar = models.ImageField(null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    description = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )
    owner = models.ForeignKey(
        CustomUser,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
    )

    def __str__(self):  # noqa: D105
        return self.name

    def avatar_url(self):
        """Get avatars urls."""
        if self.avatar:
            return self.avatar.url
        return None

    class Meta:  # noqa: D106
        verbose_name = 'Piesek'
        verbose_name_plural = 'Piesełki'


# class AllowedTrainerDays(models.Model):  # in progress
#
#     trainer = models.ForeignKey(
#         CustomUser,
#         null=False,
#         blank=False,
#         on_delete=models.CASCADE,
#     )
#
#     monday = models.BooleanField(
#         default=False,
#     )
#
#
#     def __str__(self):
#         return self.trainer.first_name + ' ' + self.trainer.last_name
#
#     class Meta:   # noqa: D106
#         verbose_name = 'Dni dostępności trenera'
#         verbose_name_plural = 'Dni dostępności trenera'


class Walk(models.Model):
    """Walk model."""

    trainer = models.ForeignKey(
        CustomUser,
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
    )
    dogs = models.ManyToManyField(Dog)
    date = models.DateTimeField(
        null=False,
        blank=False,
    )
