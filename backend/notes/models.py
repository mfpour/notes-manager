from django.db import models
from courses.models import Course


class Note(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="notes"
    )
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    folder = models.CharField(max_length=200, blank=True)
    file = models.FileField(
        upload_to="notes/",
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title