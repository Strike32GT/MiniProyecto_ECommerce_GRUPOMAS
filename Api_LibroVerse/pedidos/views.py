from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Pedido
from .serializers import PedidosSerializer

# Create your views here.

@api_view(["GET"])
def listar_pedidos(request):
    usuario_id = request.query_params.get("usuario_id")

    if usuario_id:
        pedidos = Pedido.objects.filter(usuario_id=usuario_id).order_by("-fecha")
    else:
        pedidos = Pedido.objects.all().order_by("-fecha")

    serializer = PedidosSerializer(pedidos, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def detalle_pedido(request, pk):
    pedido = get_object_or_404(Pedido, pk=pk)
    serializer = PedidosSerializer(pedido)
    return Response(serializer.data)


@api_view(["POST"])
def crear_pedido(request):
    serializer = PedidosSerializer(data=request.data, context={"request": request})

    if serializer.is_valid():
        pedido = serializer.save()
        return Response({"mensaje": "Pedido Creado Correctamente", "pedido_id": pedido.id, "total": pedido.total}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)