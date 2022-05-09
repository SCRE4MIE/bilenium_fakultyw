"""Api serializers."""

# 3rd-party
from accounts.models import CustomUser
from accounts.serializers import UserDetailSerializer
from rest_framework import serializers

# Project
from api.models import Dog
from api.models import Rating
from api.models import Walk


class RatingSerializer(serializers.ModelSerializer):
    """Rating serializer."""

    def create(self, validated_data):  # noqa:  D102
        request = self.context.get('request')
        instance = self.Meta.model(**validated_data)
        instance.evaluator_id = request.user.id
        instance.save()
        return instance

    class Meta:  # noqa: D106
        model = Rating
        fields = ['pk', 'value', 'comment', 'trainer', 'evaluator']
        extra_kwargs = {
            'evaluator': {'read_only': True},
        }


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
        fields = ['pk', 'name', 'breed', 'avatar', 'age', 'description']
        extra_kwargs = {
            'name': {'required': False},
            'breed': {'required': False},
            'avatar': {'required': False},
            'age': {'required': False},
            'description': {'required': False},
        }

    def update(self, instance, validated_data):  # noqa: D102
        if validated_data.get('name'):
            instance.name = validated_data['name']
        if validated_data.get('breed'):
            instance.breed = validated_data['breed']
        if validated_data.get('avatar'):
            instance.avatar = validated_data['avatar']
        if validated_data.get('age'):
            instance.age = validated_data['age']
        if validated_data.get('description'):
            instance.description = validated_data['description']
        instance.save()
        return instance

    def create(self, validated_data):  # noqa:  D102
        request = self.context.get('request')
        instance = self.Meta.model(**validated_data)
        instance.owner_id = request.user.id
        instance.save()
        return instance


class WalkSerializer(serializers.ModelSerializer):
    """Walks serializer."""

    class Meta:  # noqa: D106
        model = Walk
        fields = '__all__'

    def validate_dogs(self, value):
        """Dogs limit validation: 3 dogs per walk."""
        if len(value) > 3:
            raise serializers.ValidationError('Mogą być tylko 3 psy!')
        return value

    def validate(self, attrs):
        """Walk limit validation: 5 walks for trainer per day."""
        req_date = attrs.get('date')
        req_date_end = attrs.get('date_end')
        trainer = attrs.get('trainer')
        walks_day = trainer.walk_set.filter(
            date__day=req_date.day,
            date__month=req_date.month,
            date__year=req_date.year,
        )
        if walks_day.count() >= 5:  # check walks limit
            raise serializers.ValidationError('Trener może mieć dziennie tylko 5 spacerów!')

        if req_date >= req_date_end:  # check correct dates
            raise serializers.ValidationError('Data początkowa jest starsza od daty końca!')

        dogs = attrs.get('dogs')
        for i in range(len(dogs)):  # check if dog is not in other walk in the same time
            if Walk.objects.filter(dogs=dogs[i], date_end__gte=req_date, date__lte=req_date_end).exists():  # noqa: E501
                raise serializers.ValidationError(f'{dogs[i]} jest już na spacerze w tym czasie!')

        if trainer.walk_set.filter(date_end__gte=req_date, date__lte=req_date_end).exists():
            # check if trainer is available in that time
            raise serializers.ValidationError('Trener jest już na spacerze w tym czasie!')

        return attrs


class CheckTrainerInWalkSerializer(serializers.Serializer):
    """Check if trainer is available."""

    trainer_id = serializers.IntegerField()
    date_start = serializers.DateTimeField()
    date_end = serializers.DateTimeField()

    def create(self, validated_data):  # noqa: D102
        pass

    def update(self, instance, validated_data):  # noqa: D102
        pass
