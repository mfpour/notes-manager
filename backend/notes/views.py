from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from courses.models import Course
from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(course__owner=self.request.user)

    def perform_create(self, serializer):
        course = serializer.validated_data["course"]

        if course.owner != self.request.user:
            raise PermissionDenied("You do not have permission to use this course.")

        serializer.save()

    def perform_update(self, serializer):
        course = serializer.validated_data.get(
            "course",
            serializer.instance.course,
        )

        if course.owner != self.request.user:
            raise PermissionDenied("You do not have permission to use this course.")

        serializer.save()