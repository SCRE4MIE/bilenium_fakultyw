"""Api models."""
# Django
from django.core.exceptions import ValidationError
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

    evaluator = models.ForeignKey(
        CustomUser,
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
    date_end = models.DateTimeField(
        null=False,
        blank=False,
    )

    class Meta:  # noqa: D106
        verbose_name = 'Spacer'
        verbose_name_plural = 'Spacery'


class TrainersWorksDays(models.Model):
    """Trainer's works days."""

    monday = models.BooleanField(default=False)
    tuesday = models.BooleanField(default=False)
    wednesday = models.BooleanField(default=False)
    thursday = models.BooleanField(default=False)
    friday = models.BooleanField(default=False)
    saturday = models.BooleanField(default=False)
    sunday = models.BooleanField(default=False)

    trainer = models.ForeignKey(
        CustomUser,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
    )

    def __str__(self):  # noqa: D105
        return self.trainer.first_name + ' ' + self.trainer.last_name

    def clean(self, *args, **kwargs):  # noqa: D102
        trainer = self.trainer
        pk = self.id
        try:
            pk = args[0]
        except IndexError:
            pass
        if TrainersWorksDays.objects.filter(trainer=trainer).exclude(id=pk).exists():
            raise ValidationError('Może być tylko jedna instancja danego trenera!')

    class Meta:  # noqa: D106
        verbose_name = 'Dni pracy trenera'
        verbose_name_plural = 'Dni pracy trenera'
