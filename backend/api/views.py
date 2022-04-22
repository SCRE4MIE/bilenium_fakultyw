from rest_framework import status
from rest_framework.response import Response

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics

from accounts.models import CustomUser
from .models import Dog
from .serializers import TrainerSerializer, DogSerializer


class TrainersListView(generics.GenericAPIView):
    """
    Get list of trainers.
    """
    serializer_class = TrainerSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.filter(is_trainer=True)
            serializer = TrainerSerializer(user, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetTrainerView(generics.GenericAPIView):
    """
    Get trainer by id.
    """
    serializer_class = TrainerSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            trainer = CustomUser.objects.get(id=self.kwargs['pk'])
            serializer = TrainerSerializer(trainer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DogsListView(generics.GenericAPIView):
    """
    Get dogs list.
    """

    serializer_class = DogSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            dogs = Dog.objects.all()
            serializer = DogSerializer(dogs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Dog.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
