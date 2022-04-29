"""APi views."""

# 3rd-party
from rest_framework.parsers import MultiPartParser, FormParser

from accounts.models import CustomUser
from accounts.permissions import IsTrainer, IsDogOwner
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# Local
from .models import Dog
from .serializers import DogListSerializer, DogSerializer
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
    """Get dog profile."""

    serializer_class = DogSerializer
    permission_classes = (IsAuthenticated, IsDogOwner)
    queryset = Dog.objects.all()
    parser_classes = (MultiPartParser, FormParser)


class CreateDogView(generics.GenericAPIView):
    """Create dog."""

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




