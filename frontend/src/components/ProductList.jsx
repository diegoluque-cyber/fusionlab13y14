import ProductCard from "./ProductCard"

export default function ProductList({ productos }) {
  if (productos.length === 0) {
    return <p className="text-center text-gray-500">No hay productos en esta categoría.</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((p) => (
        <ProductCard
          key={p.id}
          nombre={p.nombre}
          descripcion={p.descripcion}
          precio={p.precio}
          imagen={p.imagen_url}
          categoria={p.categoria_nombre}
          cantidad={p.cantidad_disponible}
        />
      ))}
    </div>
  )
}
