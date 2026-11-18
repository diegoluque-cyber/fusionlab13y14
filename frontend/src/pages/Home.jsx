import { useState, useEffect } from "react"
import CategoryFilter from "@/components/CategoryFilter"
import ProductList from "@/components/ProductList"
import { obtenerProductos, obtenerCategorias } from "@/services/api"

export default function Home() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSel, setCategoriaSel] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [prods, cats] = await Promise.all([obtenerProductos(), obtenerCategorias()])
        setProductos(prods)
        setCategorias(cats)
      } catch (e) {
        setError("No se pudo cargar el catálogo. Verifica que el servidor Django esté activo.")
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [])

  const productosFiltrados = categoriaSel === null
    ? productos
    : productos.filter((p) => p.categoria === categoriaSel)

  if (cargando) return <p className="text-center py-10">Cargando catálogo...</p>
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>

  return (
    <main id="catalogo" className="max-w-6xl mx-auto px-4 py-8">
      <CategoryFilter
        categorias={categorias}
        seleccionada={categoriaSel}
        onSeleccionar={setCategoriaSel}
      />
      <ProductList productos={productosFiltrados} />
    </main>
  )
}
