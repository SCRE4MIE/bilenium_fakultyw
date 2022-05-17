"""Api serializers."""

# 3rd-party
from accounts.models import CustomUser
from accounts.serializers import UserDetailSerializer
from notification.models import WalkNotification
from rest_framework import serializers

# Project
from api.models import Dog
from api.models import Rating
from api.models import TrainersWorksDays
from api.models import Walk
from api.utils import day_dict


class RatingSerializer(serializers.ModelSerializer):
    """Rating serializer."""

    evaluator = UserDetailSerializer(read_only=True)

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

    def update(self, instance, validated_data):  # noqa: D102
        print('wchodze tu')
        instance = super(WalkSerializer, self).update(instance, validated_data)
        id_list = [instance.trainer.id]
        for dog in instance.dogs.all():
            id_list.append(dog.owner_id)
        notifi_obj = WalkNotification.objects.create(
            action='Update',
            walk_start_date=instance.date,
        )
        queryset = CustomUser.objects.filter(id__in=id_list)
        for user in queryset:
            notifi_obj.targets_ids.add(user)
        return instance

    def create(self, validated_data):  # noqa: D102
        instance = super().create(validated_data)
        id_list = [instance.trainer.id]
        for dog in instance.dogs.all():
            id_list.append(dog.owner_id)
        notifi_obj = WalkNotification.objects.create(
            action='Create',
            walk_start_date=instance.date,
        )
        queryset = CustomUser.objects.filter(id__in=id_list)
        for user in queryset:
            notifi_obj.targets_ids.add(user)
        return instance

    def validate_dogs(self, value):
        """Dogs limit validation: 3 dogs per walk."""
        if len(value) > 3:
            raise serializers.ValidationError('Mogą być tylko 3 psy!')
        return value

    def validate(self, attrs):
        """Walk limit validation: 5 walks for trainer per day."""
        try:
            pk = self.context['pk']
        except KeyError:
            pk = None
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

        #  allowed days validation ======
        try:
            days = day_dict(TrainersWorksDays.objects.get(trainer_id=trainer.id))
            if not days[req_date.isoweekday()] or not days[req_date_end.isoweekday()]:
                raise serializers.ValidationError('Trener w tym dniu nie pracuje!')
        except TrainersWorksDays.DoesNotExist:
            pass

        dogs = attrs.get('dogs')
        for i in range(len(dogs)):  # check if dog is not in other walk in the same time
            if Walk.objects.filter(dogs=dogs[i], date_end__gte=req_date, date__lte=req_date_end).exclude(pk=pk).exists():  # noqa: E501
                raise serializers.ValidationError(f'{dogs[i]} jest już na spacerze w tym czasie!')

        if trainer.walk_set.filter(date_end__gte=req_date, date__lte=req_date_end).exclude(pk=pk).exists():  # noqa: E501
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


class TrainersWorksDaysSerializer(serializers.ModelSerializer):
    """Trainer's work days serializer."""

    def create(self, validated_data):  # noqa: D102
        request = self.context.get('request')
        instance = self.Meta.model(**validated_data)
        instance.trainer = request.user
        instance.save()
        return instance

    def validate(self, attrs):  # noqa: D102
        request = self.context.get('request')
        attrs['trainer'] = request.user
        instance = TrainersWorksDays(**attrs)

        try:
            pk = request.parser_context.get('kwargs')['pk']
        except KeyError:
            pk = None

        instance.clean(pk)
        return attrs

    class Meta:  # noqa: D106
        model = TrainersWorksDays
        fields = '__all__'
        extra_kwargs = {
            'trainer': {'read_only': True},
        }
