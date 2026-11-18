const API_URL = "http://127.0.0.1:8000/api"

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos/`)
  if (!respuesta.ok) throw new Error("Error al obtener productos")
  return respuesta.json()
}

export async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias/`)
  if (!respuesta.ok) throw new Error("Error al obtener categorías")
  return respuesta.json()
}
