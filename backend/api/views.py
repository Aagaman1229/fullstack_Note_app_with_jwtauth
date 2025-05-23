from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializers
from rest_framework.permissions import IsAuthenticated,AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]