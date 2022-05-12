"""APi views."""

# Django
from django.utils.dateparse import parse_datetime

# 3rd-party
from accounts.models import CustomUser
from accounts.permissions import IsDogOwner
from accounts.permissions import IsTrainer
from rest_framework import generics
from rest_framework import status
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Local
from .models import Dog
from .models import Walk
from .serializers import CheckTrainerInWalkSerializer
from .serializers import DogListSerializer
from .serializers import DogSerializer
from .serializers import RatingSerializer
from .serializers import TrainerSerializer
from .serializers import WalkSerializer


class TrainersListView(generics.GenericAPIView):
    """
    Get list of trainers.

    permissions - is authenticated
    """

    serializer_class = TrainerSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):  # noqa: D102
        try:
            user = CustomUser.objects.filter(is_trainer=True)
            serializer = TrainerSerializer(user, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetTrainerView(generics.GenericAPIView):
    """
    Get trainer.

    Get trainer details.
    id = trainer's id
    permissions - is authenticated
    """

    serializer_class = TrainerSerializer
    permission_classes = (IsAuthenticated,)
    queryset = ''

    def get(self, request, *args, **kwargs):  # noqa: D102
        try:
            trainer = CustomUser.objects.get(id=self.kwargs['pk'])
            serializer = TrainerSerializer(trainer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DogsListView(generics.GenericAPIView):
    """
    Get dogs list.

    Get all dogs.
    permissions - is authenticated, trainer
    """

    serializer_class = DogListSerializer
    permission_classes = (IsAuthenticated,  IsTrainer)

    def get(self, request, *args, **kwargs):  # noqa: D102
        try:
            dogs = Dog.objects.all()
            serializer = DogListSerializer(dogs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Dog.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetUpdateDeleteDog(generics.RetrieveUpdateDestroyAPIView):
    """
    Update dog profile.

    Edit dog profile.
    id = dog's id
    permissions - is authenticated, is dog owner
    """

    serializer_class = DogSerializer
    permission_classes = (IsAuthenticated, IsDogOwner)
    queryset = Dog.objects.all()
    parser_classes = (MultiPartParser, FormParser)


class CreateDogView(generics.GenericAPIView):
    """
    Create dog.

    permissions - is authenticated
    """

    serializer_class = DogSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):  # noqa: D102
        context = {'request': request}
        reg_serializer = DogSerializer(data=request.data, context=context)
        if reg_serializer.is_valid():
            new_dog = reg_serializer.save()
            if new_dog:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersDogsListView(generics.ListAPIView):
    """
    User's dogs list.

    permissions - is authenticated, is dog owner
    """

    serializer_class = DogSerializer
    permission_classes = (IsAuthenticated, IsDogOwner)

    def get_queryset(self):  # noqa: D102
        dogs = Dog.objects.filter(owner_id=self.request.user.id)
        return dogs


class UsersDogsListForTrainerView(generics.ListAPIView):
    """
    User's dogs list for trainer.

    id = user's id
    permissions - trainer
    """

    serializer_class = DogSerializer
    permission_classes = (IsAuthenticated, IsTrainer)

    def get_queryset(self):  # noqa: D102
        dogs = Dog.objects.filter(owner_id=self.kwargs['pk'])
        return dogs


class AddRating(generics.GenericAPIView):
    """
    Rating create.

    evaluator = request.user(automatically)
    permissions - is authenticated
    """

    serializer_class = RatingSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):  # noqa: D102
        context = {'request': request}
        reg_serializer = RatingSerializer(data=request.data, context=context)
        if reg_serializer.is_valid():
            new_rating = reg_serializer.save()
            if new_rating:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateWalk(generics.CreateAPIView):
    """
    Create walk.

    permissions - is authenticated
    max 3 dogs per walk
    max 5 walks for trainer per day
    """

    serializer_class = WalkSerializer
    permission_classes = (IsAuthenticated,)


class UpdateWalk(generics.RetrieveUpdateDestroyAPIView):
    """
    Update walk.

    permissions - is authenticated
    max 3 dogs per walk
    max 5 walks for trainer per day
    """

    serializer_class = WalkSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Walk.objects.all()

    def get_serializer_context(self):
        return {'pk': self.kwargs['pk']}


class CheckTrainerInWalk(generics.GenericAPIView):
    """
    Check trainer available.

    permissions - is authenticated
    return {'is_available': True/False}
    True when trainer is available
    False when trainer is not available
    """

    serializer_class = CheckTrainerInWalkSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):  # noqa: D102
        req_serializer = CheckTrainerInWalkSerializer(data=request.data)
        if req_serializer.is_valid():
            data = {'is_available': True}
            trainer_id = req_serializer.data['trainer_id']
            date_start = parse_datetime(req_serializer.data['date_start'])
            date_end = parse_datetime(req_serializer.data['date_end'])
            try:
                trainer = CustomUser.objects.get(id=trainer_id)
            except CustomUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            if date_start >= date_end:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if trainer.walk_set.filter(date_end__gte=date_start, date__lte=date_end).exists():
                data['is_available'] = False
            walks_day = trainer.walk_set.filter(
                date__day=date_start.day,
                date__month=date_start.month,
                date__year=date_start.year,
            )
            if walks_day.count() >= 5:
                data['is_available'] = False
            return Response(data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
