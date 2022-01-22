from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer
from rest_framework import mixins


class UserModelViewSet(mixins.UpdateModelMixin, mixins.RetrieveModelMixin, mixins.ListModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
