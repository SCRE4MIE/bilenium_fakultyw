from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import RegisterUserSerializer, UserDetailSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics


class CustomUserCreate(generics.GenericAPIView):
    """
    Create a new user in the system.

    """
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenView(APIView):
    """
    Logout user by using token in header: 'Authorization'

    """
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.META.get('HTTP_AUTHORIZATION')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.GenericAPIView):
    """
    Get user details.

    Auth header: Authorization: JWT access token.
    """
    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.get(id=request.user.id)
            serializer = UserDetailSerializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

