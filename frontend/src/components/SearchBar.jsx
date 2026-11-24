export default function SearchBar({ busqueda, onBusqueda, orden, onOrden, soloOfertas, onSoloOfertas }) {
  return (
    <div className="barra">
      <label className="campo">
        Buscar
        <input
          type="search"
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Título o descripción"
        />
      </label>
      <label className="campo">
        Orden
        <select value={orden} onChange={(e) => onOrden(e.target.value)} aria-label="Ordenar por">
          <option value="">Como están en el estante</option>
          <option value="precio">Precio, de menor a mayor</option>
          <option value="-precio">Precio, de mayor a menor</option>
          <option value="nombre">Nombre, de la A a la Z</option>
        </select>
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={soloOfertas}
          onChange={(e) => onSoloOfertas(e.target.checked)}
        />
        Solo ofertas
      </label>
    </div>
  )
}
