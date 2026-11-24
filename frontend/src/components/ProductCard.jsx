import { formatearPrecio } from "@/services/api"

export default function ProductCard({ producto, onSelect }) {
  const { nombre, descripcion, imagen_url, categoria_nombre, cantidad_disponible } = producto
  const agotado = producto.estado_stock === "agotado"

  return (
    <button type="button" className="ficha" onClick={() => onSelect?.(producto)}>
      <div className="ficha-foto">
        <img src={imagen_url} alt="" className={agotado ? "apagada" : ""} />
        {producto.en_oferta && <span className="sello">−{producto.descuento}%</span>}
        {agotado && <span className="sello oscuro">Agotado</span>}
      </div>
      <p className="ficha-cat">{categoria_nombre}</p>
      <h3>{nombre}</h3>
      <p className="ficha-desc">{descripcion}</p>
      <div className="ficha-pie">
        <p className="precio">
          {formatearPrecio(producto.precio_final)}
          {producto.en_oferta && <s>{formatearPrecio(producto.precio)}</s>}
        </p>
        {producto.estado_stock === "bajo" ? (
          <p className="stock bajo">Quedan {cantidad_disponible}</p>
        ) : (
          <p className="stock">{agotado ? "Sin stock" : `${cantidad_disponible} en stock`}</p>
        )}
      </div>
    </button>
  )
}
