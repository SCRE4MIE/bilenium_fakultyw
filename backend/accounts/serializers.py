"""Accounts serializers."""
# 3rd-party
from rest_framework import serializers

# Local
from .models import CustomUser


class RegisterUserSerializer(serializers.ModelSerializer):
    """Custom register user for JWT token auth."""

    class Meta:  # noqa: D106
        model = CustomUser
        fields = ('email', 'username', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):  # noqa: D102
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserDetailSerializer(serializers.ModelSerializer):
    """User detail serializer."""

    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'pk',
            'username',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'is_trainer',
            'avatar_url',
        )


class UserEditProfileSerializer(serializers.ModelSerializer):
    """User profile edit serializer."""

    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'first_name',
            'last_name',
            'phone_number',
            'avatar',

        )

    def update(self, instance, validated_data):  # noqa: D102
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.phone_number = validated_data['phone_number']
        instance.avatar = validated_data['avatar']
        instance.save()
        return instance
