from django.db import models
from cuentas.models import Usuario
from libros.models import Libro

# Create your models here.
class Pedido(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="pedidos")
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)    

    def __str__(self):
        return f"Pedido {self.id} - {self.usuario.email}"


class PedidoItem(models.Model):
    pedido = models.ForeignKey(Pedido, related_name="items", on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro,on_delete=models.PROTECT,related_name="pedido_items")
    cantidad = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.libro.nombre} x {self.cantidad} =  S/{self.subtotal}"     