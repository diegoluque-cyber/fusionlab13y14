import { useState, useEffect } from "react"
import CategoryFilter from "@/components/CategoryFilter"
import ProductList from "@/components/ProductList"
import PromoBanner from "@/components/PromoBanner"
import SearchBar from "@/components/SearchBar"
import ProductModal from "@/components/ProductModal"
import { obtenerProductos, obtenerCategorias, obtenerPromociones } from "@/services/api"

export default function Home() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [promociones, setPromociones] = useState([])
  const [categoriaSel, setCategoriaSel] = useState(null)
  const [busqueda, setBusqueda] = useState("")
  const [busquedaFinal, setBusquedaFinal] = useState("")
  const [orden, setOrden] = useState("")
  const [soloOfertas, setSoloOfertas] = useState(false)
  const [seleccionado, setSeleccionado] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([obtenerCategorias(), obtenerPromociones()])
      .then(([cats, promos]) => {
        setCategorias(cats)
        setPromociones(promos)
      })
      .catch(() => setError("No se pudo cargar el catálogo. Verifica que el servidor Django esté activo."))
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setBusquedaFinal(busqueda.trim()), 300)
    return () => clearTimeout(t)
  }, [busqueda])

  useEffect(() => {
    let cancelado = false
    setCargando(true)
    obtenerProductos({
      search: busquedaFinal,
      categoria: categoriaSel,
      en_oferta: soloOfertas ? "true" : "",
      ordering: orden,
    })
      .then((datos) => {
        if (!cancelado) {
          setProductos(datos)
          setError(null)
        }
      })
      .catch(() => {
        if (!cancelado) setError("No se pudo cargar el catálogo. Verifica que el servidor Django esté activo.")
      })
      .finally(() => !cancelado && setCargando(false))
    return () => {
      cancelado = true
    }
  }, [busquedaFinal, categoriaSel, soloOfertas, orden])

  if (error) return <p className="aviso pagina">{error}</p>

  return (
    <main id="catalogo" className="pagina">
      <section className="masthead">
        <div>
          <p className="kicker">Catálogo</p>
          <h2>Lo que hay en el estante esta semana.</h2>
          <p>
            Novelas, cuadernos y útiles. Busca por nombre, filtra por categoría
            o quédate solo con lo que está en oferta.
          </p>
        </div>
        <div className="dato-lateral">
          <strong>{cargando ? "—" : productos.length}</strong>
          <span>{productos.length === 1 ? "título a la vista" : "títulos a la vista"}</span>
        </div>
      </section>

      <PromoBanner promociones={promociones} />
      <SearchBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        orden={orden}
        onOrden={setOrden}
        soloOfertas={soloOfertas}
        onSoloOfertas={setSoloOfertas}
      />
      <CategoryFilter
        categorias={categorias}
        seleccionada={categoriaSel}
        onSeleccionar={setCategoriaSel}
      />
      {cargando ? (
        <p className="cargando">Cargando catálogo...</p>
      ) : (
        <ProductList productos={productos} onSelect={setSeleccionado} />
      )}
      {seleccionado && (
        <ProductModal
          producto={seleccionado}
          onCerrar={() => setSeleccionado(null)}
          onSeleccionar={setSeleccionado}
        />
      )}
    </main>
  )
}
