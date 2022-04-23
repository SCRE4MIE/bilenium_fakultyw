"""Api serializers."""
# 3rd-party
from accounts.models import CustomUser
from accounts.serializers import UserDetailSerializer
from rest_framework import serializers

# Project
from api.models import Dog
from api.models import Rating


class RatingSerializer(serializers.ModelSerializer):
    """Rating serializer."""

    class Meta:  # noqa: D106
        model = Rating
        fields = '__all__'


class TrainerSerializer(serializers.ModelSerializer):
    """Trainer serializer."""

    rating_trainer = RatingSerializer(many=True, read_only=True)

    class Meta:  # noqa: D106
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


class DogSerializer(serializers.ModelSerializer):
    """Dog serializer."""

    owner = UserDetailSerializer()

    class Meta:  # noqa: D106
        model = Dog
        fields = ['pk', 'name', 'breed', 'avatar_url', 'age', 'description', 'owner']
