from . import views
from django.urls import path


urlpatterns = [
    path('zacheta/', views.Zacheta, name='zacheta'),
    path('tags/', views.Tag, name='tags'),
    path('other/', views.OtherPaintings, name='other'),
    path('authors/', views.Author, name='authors'),

]
