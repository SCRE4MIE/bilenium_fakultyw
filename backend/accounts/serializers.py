from rest_framework import serializers
from .models import CustomUser


class RegisterUserSerializer(serializers.ModelSerializer):
    """Custom register user for JWT token auth."""

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'username',
            'email',
            'phone_number',
            'is_trainer',
            'avatar_url',
        )
