"""APi views."""

# 3rd-party
from accounts.models import CustomUser
from accounts.permissions import IsTrainer
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Local
from .models import Dog
from .serializers import DogSerializer
from .serializers import TrainerSerializer


class TrainersListView(generics.GenericAPIView):
    """Get list of trainers."""

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
    """Get trainer by id."""

    serializer_class = TrainerSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):  # noqa: D102
        try:
            trainer = CustomUser.objects.get(id=self.kwargs['pk'])
            serializer = TrainerSerializer(trainer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DogsListView(generics.GenericAPIView):
    """Get dogs list."""

    serializer_class = DogSerializer
    permission_classes = (IsAuthenticated,  IsTrainer)

    def get(self, request, *args, **kwargs):  # noqa: D102
        try:
            dogs = Dog.objects.all()
            serializer = DogSerializer(dogs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Dog.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
