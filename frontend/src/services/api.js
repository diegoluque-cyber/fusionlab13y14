const API_URL = "http://127.0.0.1:8000/api"

// Construye la URL con parámetros opcionales (se ignoran los vacíos)
async function pedir(ruta, params = {}, mensajeError = "Error en la consulta") {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== "" && v !== null && v !== undefined && v !== false)
  ).toString()
  const respuesta = await fetch(`${API_URL}${ruta}${query ? `?${query}` : ""}`)
  if (!respuesta.ok) throw new Error(mensajeError)
  return respuesta.json()
}

// params: { search, categoria, en_oferta, ordering }
export const obtenerProductos = (params = {}) =>
  pedir("/productos/", params, "Error al obtener productos")

export const obtenerCategorias = () => pedir("/categorias/", {}, "Error al obtener categorías")

export const obtenerPromociones = () => pedir("/promociones/", {}, "Error al obtener promociones")

export const obtenerRecomendados = (id) =>
  pedir(`/productos/${id}/recomendados/`, {}, "Error al obtener recomendaciones")

export const obtenerResumenInventario = () =>
  pedir("/inventario/", {}, "Error al obtener el inventario")

export const formatearPrecio = (valor) => `S/ ${Number(valor).toFixed(2)}`
