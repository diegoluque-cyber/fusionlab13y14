from decimal import Decimal

from django.core.validators import MaxValueValidator
from django.db import models

# Umbral para considerar que un producto tiene "stock bajo"
STOCK_BAJO = 10


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    imagen_url = models.URLField(max_length=500)
    cantidad_disponible = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(
        Categoria, on_delete=models.CASCADE, related_name="productos"
    )
    # Lab 14: marketing (descuentos)
    descuento = models.PositiveSmallIntegerField(
        default=0,
        validators=[MaxValueValidator(90)],
        help_text="Porcentaje de descuento (0 = sin oferta)",
    )

    def __str__(self):
        return self.nombre

    @property
    def en_oferta(self):
        return self.descuento > 0

    @property
    def precio_final(self):
        """Precio con el descuento aplicado."""
        if self.descuento:
            return (self.precio * (100 - self.descuento) / 100).quantize(Decimal("0.01"))
        return self.precio

    @property
    def estado_stock(self):
        """Lab 14: gestión de inventario -> agotado / bajo / disponible."""
        if self.cantidad_disponible == 0:
            return "agotado"
        if self.cantidad_disponible <= STOCK_BAJO:
            return "bajo"
        return "disponible"


class Promocion(models.Model):
    """Banner promocional que se administra desde el panel de Django."""

    titulo = models.CharField(max_length=120)
    descripcion = models.CharField(max_length=255, blank=True)
    codigo = models.CharField(max_length=30, blank=True)
    activa = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "promociones"

    def __str__(self):
        return self.titulo
