from django.urls import path
from .views import crear_pedido

urlpatterns = [
    path('crear/', crear_pedido, name='crear_pedido'),
]