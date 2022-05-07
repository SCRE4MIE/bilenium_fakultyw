"""Api forms."""
from django import forms
from django.core.exceptions import ValidationError

from api.models import Walk
from datetime import date


class M2MDogsLimit(forms.ModelForm):
    """Dogs limits, max 3 dogs per walk"""
    class Meta:
        model = Walk
        fields = '__all__'

    def clean(self):
        dogs = self.cleaned_data.get('dogs')
        if dogs and dogs.count() > 3:  # max 3  dogs per walk
            raise ValidationError('Mogą być tylko 3 psy!')

        trainer = self.cleaned_data.get('trainer')
        today = date.today()
        walks = trainer.walk_set.filter(date__day=today.day, date__month=today.month, date__year=today.year)
        if walks.count() > 5:  # max 5 walks per day
            raise ValidationError('Jednego dnia może być tylko 5 slotów spacerowych!')

        return self.cleaned_data
