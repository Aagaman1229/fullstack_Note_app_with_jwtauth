from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializers, NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Note

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class = UserSerializers
    permission_classes = [AllowAny]



class NoteListCreate(generics.ListCreateAPIView):
    # list all of the view and create new note i.e. 2 function
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)

    # overwriting create method here
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            # additional field we want to add is user name 
            # since, author is read only in extra_kwarg
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)