"""Api forms."""
from django import forms
from django.core.exceptions import ValidationError

from api.models import Walk


class M2MDogsLimit(forms.ModelForm):
    class Meta:
        model = Walk
        fields = '__all__'

    def clean(self):
        dogs = self.cleaned_data.get('dogs')
        if dogs and dogs.count() > 3:
            raise ValidationError('Mogą być tylko 3 psy!')
        return self.cleaned_data
