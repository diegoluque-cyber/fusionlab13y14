from django.contrib import admin
from django.db.models import F

from .models import Categoria, Producto, Promocion


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre",)


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    """Gestión de inventario: stock y descuentos editables directamente en la lista."""

    list_display = ("nombre", "categoria", "precio", "descuento", "cantidad_disponible", "estado_stock")
    list_editable = ("precio", "descuento", "cantidad_disponible")
    list_filter = ("categoria",)
    search_fields = ("nombre", "descripcion")
    actions = ["reponer_10_unidades", "aplicar_descuento_10", "quitar_descuento"]

    @admin.action(description="Reponer +10 unidades de stock")
    def reponer_10_unidades(self, request, queryset):
        queryset.update(cantidad_disponible=F("cantidad_disponible") + 10)

    @admin.action(description="Aplicar 10%% de descuento")
    def aplicar_descuento_10(self, request, queryset):
        queryset.update(descuento=10)

    @admin.action(description="Quitar descuento")
    def quitar_descuento(self, request, queryset):
        queryset.update(descuento=0)


@admin.register(Promocion)
class PromocionAdmin(admin.ModelAdmin):
    list_display = ("titulo", "codigo", "activa")
    list_editable = ("activa",)
