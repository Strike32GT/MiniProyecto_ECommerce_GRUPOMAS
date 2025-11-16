from django.db import models

# Create your models here.
class Libro(models.Model):
    nombre = models.CharField(max_length=255)
    autor = models.CharField(max_length=255)

    calificacion = models.FloatField(default=0.0)
    total_valoraciones = models.PositiveIntegerField(default=0)

    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descuento = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    precio_final=models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    envio_gratis = models.BooleanField(default=False)
    costo_envio = models.DecimalField(max_digits=6, decimal_places=2, default=2.90)

    cantidad_disponible = models.PositiveIntegerField(default=0)

    descripcion = models.TextField(blank=True)
    especificaciones =  models.TextField(blank=True)

    imagen = models.ImageField(upload_to='libros/', blank=True, null=True)


    def save(self, *args, **kwargs):
        if self.descuento > 0:
            self.precio_final= self.precio - (self.precio * (self.descuento/100))

        else:
            self.precio_final = self.precio
        
        super().save(*args,**kwargs)


    def __str__(self):
        return self.nombre    