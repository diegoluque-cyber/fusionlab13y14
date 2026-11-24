import { useEffect, useState } from "react"
import { obtenerRecomendados, formatearPrecio } from "@/services/api"

export default function ProductModal({ producto, onCerrar, onSeleccionar }) {
  const [recomendados, setRecomendados] = useState([])

  useEffect(() => {
    let cancelado = false
    obtenerRecomendados(producto.id)
      .then((datos) => !cancelado && setRecomendados(datos))
      .catch(() => !cancelado && setRecomendados([]))
    return () => {
      cancelado = true
    }
  }, [producto.id])

  useEffect(() => {
    const alPresionar = (e) => e.key === "Escape" && onCerrar()
    window.addEventListener("keydown", alPresionar)
    return () => window.removeEventListener("keydown", alPresionar)
  }, [onCerrar])

  return (
    <div className="velo" onClick={onCerrar} role="dialog" aria-modal="true">
      <div className="hoja" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="hoja-cerrar" onClick={onCerrar}>
          Cerrar
        </button>

        <div className="hoja-grid">
          <img src={producto.imagen_url} alt="" />
          <div>
            <p className="kicker">{producto.categoria_nombre}</p>
            <h2>{producto.nombre}</h2>
            <p className="ficha-desc">{producto.descripcion}</p>
            <p className="precio" style={{ marginTop: 16, fontSize: "1.7rem" }}>
              {formatearPrecio(producto.precio_final)}
              {producto.en_oferta && (
                <>
                  <s>{formatearPrecio(producto.precio)}</s>
                  <span className="sello" style={{ position: "static", marginLeft: 10 }}>
                    −{producto.descuento}%
                  </span>
                </>
              )}
            </p>
            <p className="stock" style={{ marginTop: 8 }}>
              {producto.estado_stock === "agotado"
                ? "Producto agotado"
                : `${producto.cantidad_disponible} en stock`}
            </p>
          </div>
        </div>

        {recomendados.length > 0 && (
          <div className="tambien">
            <h3>También en el estante</h3>
            <div className="tambien-lista">
              {recomendados.map((r) => (
                <button key={r.id} type="button" className="mini" onClick={() => onSeleccionar(r)}>
                  <img src={r.imagen_url} alt="" />
                  <p>{r.nombre}</p>
                  <span>{formatearPrecio(r.precio_final)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
