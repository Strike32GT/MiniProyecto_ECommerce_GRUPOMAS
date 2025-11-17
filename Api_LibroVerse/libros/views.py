from django.shortcuts import render

from rest_framework import viewsets,filters
from .models import Libro
from .serializers import LibroSerializer

# Create your views here.
class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer
    filter_backends = [filters.OrderingFilter]
    search_fields = ['nombre', 'autor', 'categoria__nombre','tipo__nombre']
    ordering_fields = ['nombre','categoria','year_publicacion', 'precio_final', 'paginas']
    ordering = ['nombre']