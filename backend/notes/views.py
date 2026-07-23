from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Note
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = Note.objects.filter(
            course__owner=self.request.user
        ).select_related("course")

        course_id = self.request.query_params.get("course")

        if course_id:
            queryset = queryset.filter(course_id=course_id)

        return queryset

    def perform_create(self, serializer):
        course = serializer.validated_data["course"]

        if course.owner != self.request.user:
            raise PermissionDenied(
                "You do not have permission to use this course."
            )

        serializer.save()

    def perform_update(self, serializer):
        course = serializer.validated_data.get(
            "course",
            serializer.instance.course,
        )

        if course.owner != self.request.user:
            raise PermissionDenied(
                "You do not have permission to use this course."
            )

        serializer.save()

    def perform_destroy(self, instance):
        if instance.file:
            instance.file.delete(save=False)

        instance.delete()