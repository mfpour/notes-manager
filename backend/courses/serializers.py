from rest_framework import serializers
from .models import Course


class CourseSerializer(serializers.ModelSerializer):
    notes_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "semester",
            "created_at",
            "notes_count",
        ]
        read_only_fields = [
            "created_at",
            "notes_count",
        ]

    def get_notes_count(self, obj):
        return obj.notes.count()