from rest_framework import serializers

from .models import Categoria, Producto, Promocion


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nombre"]


class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)
    precio_final = serializers.DecimalField(max_digits=8, decimal_places=2, read_only=True)
    en_oferta = serializers.BooleanField(read_only=True)
    estado_stock = serializers.CharField(read_only=True)

    class Meta:
        model = Producto
        fields = [
            "id",
            "nombre",
            "descripcion",
            "precio",
            "descuento",
            "precio_final",
            "en_oferta",
            "imagen_url",
            "cantidad_disponible",
            "estado_stock",
            "categoria",
            "categoria_nombre",
        ]


class PromocionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promocion
        fields = ["id", "titulo", "descripcion", "codigo"]
