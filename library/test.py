import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from django.contrib.auth.models import User
from user.views import UserModelViewSet
from user.models import User


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/user/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        user = User.objects.create(
            user_name='Пушкин', email='9874923874@mail.ru')
        client = APIClient()
        response = client.get(f'/api/user/{user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUser1ViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/user/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
