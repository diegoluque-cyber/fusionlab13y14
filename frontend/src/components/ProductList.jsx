import ProductCard from "./ProductCard"

export default function ProductList({ productos, onSelect }) {
  if (productos.length === 0) {
    return <p className="vacio">No hay títulos con ese criterio.</p>
  }
  return (
    <div className="rejilla">
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} onSelect={onSelect} />
      ))}
    </div>
  )
}
