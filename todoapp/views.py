from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer, ToDoSerializer
from .models import Project, ToDo
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectLimitOffsetPagination

    # def get_queryset(self):
    #     return Project.objects.filter(name__contains='new')


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
    filterset_fields = ['project', 'text',
                        'create', 'update', 'creator', 'is_active']
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object().ToDo
        todo.is_active = False
        todo.save()
        return Response(ToDoSerializer(self.get_object()).data)
