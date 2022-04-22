from rest_framework import serializers

from accounts.models import CustomUser
from api.models import Rating


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = (
            'value',
            'comment',
        )


class TrainerSerializer(serializers.ModelSerializer):
    rating_set = RatingSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'pk',
            'username',
            'email',
            'phone_number',
            'is_trainer',
            'avatar_url',
            'rating_set',
        )
