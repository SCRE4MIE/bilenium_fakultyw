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


class DogListSerializer(serializers.ModelSerializer):
    """Dog serializer."""

    owner = UserDetailSerializer()

    class Meta:  # noqa: D106
        model = Dog
        fields = ['pk', 'name', 'breed', 'avatar_url', 'age', 'description', 'owner']


class DogSerializer(serializers.ModelSerializer):
    """Dog serializer."""

    class Meta:  # noqa: D106
        model = Dog
        fields = ['pk', 'name', 'breed', 'avatar', 'age', 'description', 'owner']
        extra_kwargs = {
            'name': {'required': False},
            'breed': {'required': False},
            'avatar': {'required': False},
            'age': {'required': False},
            'description': {'required': False},
        }

        def update(self, instance, validated_data):  # noqa: D102
            if validated_data.get('name'):
                instance.first_name = validated_data['name']
            if validated_data.get('breed'):
                instance.last_name = validated_data['breed']
            if validated_data.get('avatar'):
                instance.phone_number = validated_data['avatar']
            if validated_data.get('age'):
                instance.avatar = validated_data['age']
            if validated_data.get('description'):
                instance.avatar = validated_data['description']
            if validated_data.get('owner'):
                instance.avatar = validated_data['owner']
            instance.save()
            return instance
