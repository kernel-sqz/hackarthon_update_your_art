from django.db import models


class Author(models.Model):
    author = models.CharField(max_length=128)
    life_span = models.CharField(max_length=16, blank=True, null=True)
    description = models.TextField(max_length=999, null=True, blank=True)


class Tag(models.Model):
    tag = models.CharField(max_length=64)


class Zacheta(models.Model):
    url = models.URLField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    description = models.TextField(max_length=999, null=True, blank=True)
    note_for_teacher = models.TextField(max_length=999, null=True, blank=True)


class OtherPaintings(models.Model):
    url = models.URLField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    zacheta = models.ForeignKey(Zacheta, on_delete=models.CASCADE)
    description = models.TextField(max_length=999, null=True, blank=True)
