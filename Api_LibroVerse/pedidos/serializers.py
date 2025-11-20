from rest_framework import serializers
from .models import Pedido, PedidoItem
from libros.models import Libro

class PedidoItemSerializer(serializers.Serializer):
    libro_id= serializers.IntegerField()
    cantidad = serializers.IntegerField()

    def validate(self,data):
        try:
            libro = Libro.objects.get(id=data['libro_id'])
        except Libro.DoesNotExist:
            raise serializers.ValidationError("Libro no encontrado")

        if libro.cantidad_disponible < data["cantidad"]:
            raise serializers.ValidationError(f"No hay suficiente stock para {libro.nombre}")    
        
        
        return data


class PedidosSerializer(serializers.ModelSerializer):
    items = PedidoItemSerializer(many=True)

    def create(self, validated_data):
        request = self.context['request']
        usuario = request.user

        item_data = validated_data.pop('items')

        pedido = Pedido.objects.create(usuario=usuario, total=0)
        total_pedido=0

        for item in item_data:
            libro = Libro.objects.get(id=item["libro_id"])
            cantidad = item["cantidad"]

            subtotal = libro.precio_final * cantidad

            total_pedido += subtotal

            PedidoItem.objects.create(
                pedido=pedido,
                libro=libro,
                cantidad=cantidad,
                subtotal=subtotal
            ) 

            libro.cantidad_disponible -= cantidad
            libro.save()

        pedido.total=total_pedido
        pedido.save()

        return pedido     