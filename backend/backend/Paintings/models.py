from django.db import models


class Author(models.Model):
    id = models.CharField(max_length=512, primary_key=True)
    author = models.CharField(max_length=128)
    life_span = models.CharField(max_length=64, blank=True, null=True)
    description = models.TextField(max_length=999, null=True, blank=True)


class Tag(models.Model):
    id = models.IntegerField(primary_key=True)
    tag = models.CharField(max_length=64)


class Zacheta(models.Model):
    id = models.IntegerField(primary_key=True)
    url = models.CharField(max_length=256)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=128, default="")
    tags = models.ManyToManyField(Tag, null=True, blank=True)
    description = models.TextField(max_length=999, null=True, blank=True)
    note_for_teacher = models.TextField(max_length=999, null=True, blank=True)


class OtherPaintings(models.Model):
    id = models.IntegerField(primary_key=True)
    url = models.CharField(max_length=256)
    author = models.ForeignKey(
        Author, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=128, default="")
    tags = models.ManyToManyField(Tag)
    zacheta = models.ForeignKey(Zacheta, on_delete=models.CASCADE)
    description = models.TextField(max_length=999, null=True, blank=True)
