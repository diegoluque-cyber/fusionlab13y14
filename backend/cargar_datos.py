from catalogo.models import Categoria, Producto

datos = {
    "Novelas": [
        ("Cien años de soledad", "Novela clásica de Gabriel García Márquez", 55, 10, "libro1"),
        ("El Principito", "Libro infantil ilustrado de Saint-Exupéry", 30, 15, "libro2"),
        ("La ciudad y los perros", "Novela de Mario Vargas Llosa", 48, 8, "libro3"),
    ],
    "Cuadernos": [
        ("Cuaderno cuadriculado", "Cuaderno de 100 hojas cuadriculadas", 8, 50, "cuaderno1"),
        ("Cuaderno rayado", "Cuaderno de 100 hojas rayadas", 7, 40, "cuaderno2"),
    ],
    "Útiles": [
        ("Lápices de colores", "Caja de 12 lápices de colores", 15, 25, "utiles1"),
        ("Borrador y tajador", "Set de borrador y tajador", 4, 60, "utiles2"),
    ],
}

for nombre_cat, productos in datos.items():
    cat, _ = Categoria.objects.get_or_create(nombre=nombre_cat)
    for nombre, desc, precio, stock, semilla in productos:
        Producto.objects.get_or_create(
            nombre=nombre,
            defaults={
                "descripcion": desc,
                "precio": precio,
                "cantidad_disponible": stock,
                "imagen_url": f"https://picsum.photos/seed/{semilla}/400/300",
                "categoria": cat,
            },
        )
print("Categorías:", Categoria.objects.count(), "| Productos:", Producto.objects.count())
