export default function CategoryFilter({ categorias, seleccionada, onSeleccionar }) {
  return (
    <div className="categorias">
      <button
        type="button"
        className={seleccionada === null ? "activa" : ""}
        onClick={() => onSeleccionar(null)}
      >
        Todas
      </button>
      {categorias.map((c) => (
        <button
          key={c.id}
          type="button"
          className={seleccionada === c.id ? "activa" : ""}
          onClick={() => onSeleccionar(c.id)}
        >
          {c.nombre}
        </button>
      ))}
    </div>
  )
}
