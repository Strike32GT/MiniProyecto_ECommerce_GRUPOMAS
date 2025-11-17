from django.contrib import admin
from .models import Libro,Categoria,TipoLibro

# Register your models here.
admin.site.register(Libro)
admin.site.register(Categoria)
admin.site.register(TipoLibro)