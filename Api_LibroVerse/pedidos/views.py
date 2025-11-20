from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import PedidosSerializer

# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])

def crear_pedido(request):
    serializer =  PedidosSerializer(data=request.data, context={"request":request})

    if serializer.is_valid():
        pedido = serializer.save()
        return Response({"mensaje":"Pedido Creado Correctamente", "pedido_id": pedido.id, "total": pedido.total}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)