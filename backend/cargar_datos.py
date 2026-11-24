from catalogo.models import Categoria, Producto, Promocion

# (nombre, descripción, precio, stock, semilla de imagen, % descuento)
datos = {
    "Novelas": [
        ("Cien años de soledad", "Novela clásica de Gabriel García Márquez", 55, 10, "libro1", 15),
        ("El Principito", "Libro infantil ilustrado de Saint-Exupéry", 35, 15, "libro2", 0),
        ("La ciudad y los perros", "Novela de Mario Vargas Llosa", 48, 8, "libro3", 0),
    ],
    "Cuadernos": [
        ("Cuaderno cuadriculado", "Cuaderno de 100 hojas cuadriculadas", 8, 50, "cuaderno1", 10),
        ("Cuaderno rayado", "Cuaderno de 100 hojas rayadas", 7, 40, "cuaderno2", 0),
    ],
    "Útiles": [
        ("Lápices de colores", "Caja de 12 lápices de colores", 15, 25, "utiles1", 20),
        ("Borrador y tajador", "Set de borrador y tajador", 4, 0, "utiles2", 0),
    ],
}

for nombre_cat, productos in datos.items():
    cat, _ = Categoria.objects.get_or_create(nombre=nombre_cat)
    for nombre, desc, precio, stock, semilla, descuento in productos:
        Producto.objects.update_or_create(
            nombre=nombre,
            defaults={
                "descripcion": desc,
                "precio": precio,
                "cantidad_disponible": stock,
                "imagen_url": f"https://picsum.photos/seed/{semilla}/400/300",
                "categoria": cat,
                "descuento": descuento,
            },
        )

promociones = [
    ("Semana del Libro: hasta 15% de descuento", "En novelas seleccionadas", "LIBROS15"),
    ("Vuelta a clases", "20% en lápices de colores y 10% en cuadernos", "CLASES20"),
]
for titulo, descripcion, codigo in promociones:
    Promocion.objects.update_or_create(
        titulo=titulo, defaults={"descripcion": descripcion, "codigo": codigo, "activa": True}
    )

print(
    "Categorías:", Categoria.objects.count(),
    "| Productos:", Producto.objects.count(),
    "| Promociones:", Promocion.objects.count(),
)
