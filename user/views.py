from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer
from rest_framework import mixins
from rest_framework.permissions import AllowAny


class UserModelViewSet(ModelViewSet):
    # permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
