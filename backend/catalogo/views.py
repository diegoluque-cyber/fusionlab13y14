from django.shortcuts import get_object_or_404
from rest_framework import filters, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from .models import STOCK_BAJO, Categoria, Producto, Promocion
from .serializers import CategoriaSerializer, ProductoSerializer, PromocionSerializer


class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all().order_by("nombre")
    serializer_class = CategoriaSerializer


class PromocionViewSet(viewsets.ReadOnlyModelViewSet):
    """Solo las promociones activas (se activan/desactivan desde el admin)."""

    queryset = Promocion.objects.filter(activa=True).order_by("-id")
    serializer_class = PromocionSerializer


class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/productos/                      -> listado
        ?search=texto                        -> búsqueda por nombre, descripción o categoría
        ?categoria=<id>                      -> filtro por categoría
        ?en_oferta=true                      -> solo productos con descuento
        ?ordering=precio | -precio | nombre  -> ordenamiento
    GET /api/productos/<id>/recomendados/    -> productos recomendados
    """

    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre", "descripcion", "categoria__nombre"]
    ordering_fields = ["precio", "nombre", "cantidad_disponible"]
    ordering = ["id"]

    def get_queryset(self):
        queryset = Producto.objects.select_related("categoria")
        categoria = self.request.query_params.get("categoria")
        if categoria and categoria.isdigit():
            queryset = queryset.filter(categoria_id=int(categoria))
        if self.request.query_params.get("en_oferta") == "true":
            queryset = queryset.filter(descuento__gt=0)
        return queryset

    @action(detail=True, methods=["get"])
    def recomendados(self, request, pk=None):
        """
        Sistema de recomendación basado en contenido. Cada candidato recibe un puntaje:
          +50 si es de la misma categoría
          +0 a 30 según qué tan cercano es su precio al del producto visto
          +10 si está en oferta
        Solo se consideran productos con stock. Se devuelven los 4 mejores.
        """
        producto = get_object_or_404(Producto, pk=pk)
        candidatos = (
            Producto.objects.select_related("categoria")
            .filter(cantidad_disponible__gt=0)
            .exclude(pk=producto.pk)
        )

        def puntaje(p):
            total = 0
            if p.categoria_id == producto.categoria_id:
                total += 50
            diferencia = abs(float(p.precio_final) - float(producto.precio_final))
            total += max(0, 30 - diferencia)
            if p.en_oferta:
                total += 10
            return total

        mejores = sorted(candidatos, key=puntaje, reverse=True)[:4]
        return Response(self.get_serializer(mejores, many=True).data)


@api_view(["GET"])
def resumen_inventario(request):
    """Resumen para el panel de inventario."""
    productos = list(Producto.objects.all())
    return Response(
        {
            "umbral_stock_bajo": STOCK_BAJO,
            "total_productos": len(productos),
            "unidades_totales": sum(p.cantidad_disponible for p in productos),
            "agotados": sum(1 for p in productos if p.estado_stock == "agotado"),
            "stock_bajo": sum(1 for p in productos if p.estado_stock == "bajo"),
            "valor_inventario": f"{sum(p.precio * p.cantidad_disponible for p in productos):.2f}",
        }
    )
