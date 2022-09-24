from rest_framework import viewsets
from .serializers import *
from rest_framework import views
from rest_framework.response import Response


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


class EuropeanaView(views.APIView):
    def get(self, request, format=None):
        tags = [tag.tag for tag in Tag.objects.all()]
        return Response(tags)
