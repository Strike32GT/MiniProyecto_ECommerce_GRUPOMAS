from django.db import models

# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nombre


class TipoLibro(models.Model):
    nombre = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nombre
    

class Libro(models.Model):
    nombre = models.CharField(max_length=255)
    autor = models.CharField(max_length=255)

    categoria = models.ForeignKey(
        'Categoria', on_delete=models.SET_NULL, null=True, blank= True, related_name='libros'
    )

    tipo = models.ForeignKey(
        'TipoLibro', on_delete=models.SET_NULL,null=True,blank=True,related_name='libros'
    )

    year_publicacion = models.PositiveSmallIntegerField(null= True, blank= True)
    paginas = models.PositiveIntegerField(default=0)
    editorial = models.CharField(max_length=255, blank=True)
    idioma = models.CharField(max_length =30, blank=True)

    calificacion = models.FloatField(default=0.0)

    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    precio_final=models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    envio_gratis = models.BooleanField(default=False)
    costo_envio = models.DecimalField(max_digits=6, decimal_places=2, default=2.90)

    cantidad_disponible = models.PositiveIntegerField(default=0)

    descripcion = models.TextField(blank=True)

    imagen = models.ImageField(upload_to='libros/portadas/', blank=True, null=True)


    def save(self, *args, **kwargs):
        if self.descuento > 0:
            self.precio_final= self.precio - (self.precio * (self.descuento/100))

        else:
            self.precio_final = self.precio
        
        super().save(*args,**kwargs)


    def __str__(self):
        return self.nombre    
    

class Pedido(models.Model):
    usuario = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20,default="pendiente")    

    def __str__(self):
        return f"Pedido {self.id} - {self.usuario.nombre_completo}"


class PedidoItem(models.Model):
    pedido = models.ForeignKey(Pedido, related_name="items", on_delete=models.CASCADE)
    libro = models.ForeignKey("Libro",on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{(self.cantidad) * (self.precio_unitario)}"        