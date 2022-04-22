from rest_framework import serializers

from accounts.models import CustomUser
from accounts.serializers import UserDetailSerializer
from api.models import Rating, Dog


class RatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = '__all__'


class TrainerSerializer(serializers.ModelSerializer):
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


class DogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dog
        fields = ['pk', 'name', 'breed', 'avatar_url', 'age', 'description', 'owner']