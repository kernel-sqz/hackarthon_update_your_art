

from django.urls import path, include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from Paintings.views import *

router = routers.DefaultRouter()

router.register(r'authors', AuthorView, 'authors')
router.register(r'tags', TagView, 'tags')
router.register(r'zacheta', ZachetaView, 'zacheta')
router.register(r'others', OtherPaintingsView, 'others')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((router.urls))),
    path('api/europeana', EuropeanaView.as_view())
]
