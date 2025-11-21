from django.urls import path
from .views import listar_pedidos, detalle_pedido, crear_pedido

urlpatterns = [
    path('', listar_pedidos, name='listar_pedidos'),
    path('<int:pk>/', detalle_pedido, name='detalle_pedido'),
    path('crear/', crear_pedido, name='crear_pedido'),
]