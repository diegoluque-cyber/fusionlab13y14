from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("categorias", views.CategoriaViewSet, basename="categoria")
router.register("productos", views.ProductoViewSet, basename="producto")
router.register("promociones", views.PromocionViewSet, basename="promocion")

urlpatterns = [
    path("inventario/", views.resumen_inventario, name="inventario"),
    path("", include(router.urls)),
]
