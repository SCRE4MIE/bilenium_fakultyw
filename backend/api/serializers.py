from rest_framework import serializers

from accounts.models import CustomUser
from api.models import Rating


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = '__all__'


class TrainerSerializer(serializers.HyperlinkedModelSerializer):
    rating_trainer = RatingSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'pk',
            'username',
            'email',
            'phone_number',
            'is_trainer',
            'avatar_url',
            'rating_trainer',
        ]
