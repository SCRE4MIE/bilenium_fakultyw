"""Accounts views."""
# 3rd-party
from rest_framework import generics
from rest_framework import status
from rest_framework.parsers import FormParser
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

# Local
from .models import CustomUser
from .serializers import RegisterUserSerializer
from .serializers import UserDetailSerializer
from .serializers import UserEditProfileSerializer


class CustomUserCreate(generics.GenericAPIView):
    """Create a new user in the system."""

    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer

    def post(self, request):  # noqa: D102
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenView(APIView):
    """Logout user by using token in header: 'Authorization'."""

    permission_classes = [AllowAny]

    def post(self, request):  # noqa: D102
        try:
            refresh_token = request.META.get('HTTP_AUTHORIZATION')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:  # noqa: F841
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.GenericAPIView):
    """
    Get user details.

    Auth header: Authorization: JWT access token.
    """

    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):  # noqa: D102
        try:
            user = CustomUser.objects.get(id=request.user.id)
            serializer = UserDetailSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserProfileEdit(generics.UpdateAPIView):
    """Update user profile."""

    serializer_class = UserEditProfileSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, *args, **kwargs):  # noqa: D102
        user = CustomUser.objects.get(id=self.request.user.id)
        return user
