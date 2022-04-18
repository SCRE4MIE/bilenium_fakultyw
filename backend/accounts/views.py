from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics


class CustomUserCreate(generics.GenericAPIView):
    """
    Create a new user in the system.

    """
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer

    @staticmethod
    def post(request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)