from django.contrib import admin
from .models import *


@admin.register(Author)
class IncidentAdmin(admin.ModelAdmin):
    list_display = []
    list_filter = []
    search_fields = []


@admin.register(Tag)
class IncidentAdmin(admin.ModelAdmin):
    list_display = []
    list_filter = []
    search_fields = []


@admin.register(Zacheta)
class IncidentAdmin(admin.ModelAdmin):
    list_display = []
    list_filter = []
    search_fields = []


@admin.register(OtherPaintings)
class IncidentAdmin(admin.ModelAdmin):
    list_display = []
    list_filter = []
    search_fields = []
