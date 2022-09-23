from rest_framework import viewsets
from .serializers import *


class AuthorView(viewsets.ModelViewSet):
    serializer_class = AuthorSerializer

    def get_queryset(self):
        return Author.objects.all()


class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer

    def get_queryset(self):
        return Tag.objects.all()


class ZachetaView(viewsets.ModelViewSet):
    serializer_class = ZachetaSerializer

    def get_queryset(self):
        return Zacheta.objects.all()


class OtherPaintingsView(viewsets.ModelViewSet):
    serializer_class = OtherPaintingsSerializer

    def get_queryset(self):
        return OtherPaintings.objects.all()
