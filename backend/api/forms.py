"""Api forms."""

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
        try:
            pk = self.instance.id
        except KeyError:
            pk = None

        dogs = self.cleaned_data.get('dogs')
        if dogs and dogs.count() > 3:  # max 3  dogs per walk
            raise ValidationError('Mogą być tylko 3 psy!')

        trainer = self.cleaned_data.get('trainer')
        start_date = self.cleaned_data.get('date')
        end_date = self.cleaned_data.get('date_end')

        walks = trainer.walk_set.filter(
            date__day=start_date.day,
            date__month=start_date.month,
            date__year=start_date.year,
        )
        if walks.count() > 5:  # max 5 walks per day
            raise ValidationError('Jednego dnia może być tylko 5 slotów spacerowych!')

        if start_date >= end_date:  # check correct dates
            raise ValidationError('Data początkowa jest starsza od daty końca!')

        for i in range(len(dogs)):  # check if dog is not in other walk in the same time
            if Walk.objects.filter(dogs=dogs[i], date_end__gte=start_date, date__lte=end_date).exclude(id=pk).exists():  # noqa: E501
                raise ValidationError(f'{dogs[i]} jest już na spacerze w tym czasie!')

        if trainer.walk_set.filter(date_end__gte=start_date, date__lte=end_date).exclude(id=pk).exists():
            # check if trainer is available in that time
            raise ValidationError('Trener jest już na spacerze w tym czasie!')

        return self.cleaned_data
