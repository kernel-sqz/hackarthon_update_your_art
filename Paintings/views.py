from rest_framework import viewsets
from .serializers import *
from rest_framework import views
from rest_framework.response import Response
import requests


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
    searchUrl = r'https://api.europeana.eu/record/search.json'
    key = 'ibleauck'

    def get(self, request, format=None):
        tags = [tag.tag for tag in Tag.objects.all()]
        params = {
            "wskey": self.key,
            "media": True,
            "query": request.query_params["query"],
            "start": request.query_params.get("start", "1")
            }
        resp = requests.get(self.searchUrl, params=params)

        return Response({"tags": tags,
                         "art": self.process(resp.json(),
                                             OtherPaintings.objects.all())})

    def process(self, search, added):
        # return search
        return {
            "success": search["success"],
            "itemsCount": search["itemsCount"],
            "totalResults": search["totalResults"],
            "items": [{
                    "title": item["title"],
                    "guid": item["guid"],
                    "preview": item["edmPreview"],
                    "full": item["edmIsShownBy"],
                    "tags": self._getTags(item["guid"], added)
                } for item in search["items"]]
            }

    def _getTags(self, guid, added):
        a = [ad for ad in added if ad.guid == guid]
        if len(a) != 1:
            return []
        return [tag.tag for tag in a[0].tags.all()]
