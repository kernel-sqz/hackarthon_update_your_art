from rest_framework import serializers
from .models import *


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ('id', 'author', 'life_span', 'description')


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'tag')


class ZachetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zacheta
        fields = ('id', 'url', 'author', 'tags',
                  'description', 'note_for_teacher')


class OtherPaintingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = OtherPaintings
        fields = ('id', 'guid', 'preview', 'full', 'author',
                  'tags', 'zacheta', 'description')
