"""Notification views."""

# 3rd-party
from notification.models import WalkNotifiCustomUser
from notification.serializers import WalkNotifiCustomUserSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class WalkNotificationView(generics.GenericAPIView):
    """
    Get Walk notification.

    permissions - is authenticated
    """

    serializer_class = WalkNotifiCustomUserSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        """Get notification and change notification's is_display field."""
        try:
            walk_notifi_customuser = WalkNotifiCustomUser.objects.filter(user=self.request.user).exclude(is_displayed=True)  # noqa: E501
            if len(walk_notifi_customuser) == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = WalkNotifiCustomUserSerializer(walk_notifi_customuser, many=True)
            for notification in walk_notifi_customuser:
                notification.is_displayed = True
                notification.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except WalkNotifiCustomUser.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
