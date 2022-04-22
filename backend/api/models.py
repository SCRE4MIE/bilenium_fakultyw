from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from accounts.models import CustomUser


class Rating(models.Model):
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

    def __str__(self):
        return self.trainer.first_name + ' ' + self.trainer.last_name


class Dog(models.Model):

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

    def __str__(self):
        return self.name

    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        return None

    class Meta:
        verbose_name = 'Piesek'
        verbose_name_plural = 'Piesełki'


class Walk(models.Model):

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
