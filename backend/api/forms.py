"""Api forms."""
# Standard Library
from datetime import date

# Django
from django import forms
from django.core.exceptions import ValidationError

# Project
from api.models import Walk


class WalkLimit(forms.ModelForm):
    """
    Walk validations.

    Max 3 dogs.
    Max 5 walks for trainer per day.
    """

    class Meta:  # noqa: D106
        model = Walk
        fields = '__all__'

    def clean(self):  # noqa: D102
        dogs = self.cleaned_data.get('dogs')
        if dogs and dogs.count() > 3:  # max 3  dogs per walk
            raise ValidationError('Mogą być tylko 3 psy!')

        trainer = self.cleaned_data.get('trainer')
        today = date.today()
        walks = trainer.walk_set.filter(
            date__day=today.day,
            date__month=today.month,
            date__year=today.year,
        )
        if walks.count() > 5:  # max 5 walks per day
            raise ValidationError('Jednego dnia może być tylko 5 slotów spacerowych!')

        return self.cleaned_data
