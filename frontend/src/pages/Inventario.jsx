import { useEffect, useState } from "react"
import { obtenerProductos, obtenerResumenInventario, formatearPrecio } from "@/services/api"

const ESTADOS = {
  agotado: { texto: "Agotado", clase: "agotado" },
  bajo: { texto: "Pocas unidades", clase: "bajo" },
  disponible: { texto: "En estante", clase: "" },
}

export default function Inventario() {
  const [resumen, setResumen] = useState(null)
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([obtenerResumenInventario(), obtenerProductos({ ordering: "cantidad_disponible" })])
      .then(([r, p]) => {
        setResumen(r)
        setProductos(p)
      })
      .catch(() => setError("No se pudo cargar el inventario. Verifica que el servidor Django esté activo."))
  }, [])

  if (error) return <p className="aviso pagina">{error}</p>
  if (!resumen) return <p className="cargando pagina">Cargando inventario...</p>

  return (
    <main className="pagina">
      <p className="kicker">Depósito</p>
      <h2 className="titulo-seccion">Inventario</h2>
      <p className="pie-nota">
        Lectura del stock. Los cambios se hacen en el panel de administración.
      </p>

      <div className="resumen">
        <div>
          <span>Productos</span>
          <strong>{resumen.total_productos}</strong>
        </div>
        <div>
          <span>Unidades</span>
          <strong>{resumen.unidades_totales}</strong>
        </div>
        <div>
          <span>Agotados</span>
          <strong className="alerta">{resumen.agotados}</strong>
        </div>
        <div>
          <span>Stock bajo (≤ {resumen.umbral_stock_bajo})</span>
          <strong className="alerta">{resumen.stock_bajo}</strong>
        </div>
      </div>
      <p className="valor">
        Valor del inventario: <strong>{formatearPrecio(resumen.valor_inventario)}</strong>
      </p>

      <div className="tabla-wrap">
        <table className="libro">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => {
              const estado = ESTADOS[p.estado_stock]
              return (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria_nombre}</td>
                  <td>{formatearPrecio(p.precio_final)}</td>
                  <td>{p.cantidad_disponible}</td>
                  <td>
                    <span className={`estado ${estado.clase}`}>{estado.texto}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
