from rest_framework import status
from rest_framework.response import Response

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics

from accounts.models import CustomUser
from .serializers import TrainerSerializer


class TrainersListView(generics.GenericAPIView):
    """
    Get list of trainers.
    """
    serializer_class = TrainerSerializer
    permission_classes = (AllowAny,)
    queryset = CustomUser.objects.filter(is_trainer=True)

    def get(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.filter(is_trainer=True)
            serializer = TrainerSerializer(user, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)