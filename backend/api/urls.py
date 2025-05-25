from django.urls import path
from .views import NoteListCreate,NoteDelete

urlpatterns = [
    path("notes/",NoteListCreate.as_view(),name="note-list"),
    path("notes/delete/<int:pk>/",NoteDelete.as_view(),name="note-delete")
]
