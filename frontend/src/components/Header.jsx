import { useState } from "react"

const ENLACES = [
  { id: "tienda", texto: "Tienda" },
  { id: "inventario", texto: "Inventario" },
]

export default function Header({ vista, onNavegar }) {
  const [abierto, setAbierto] = useState(false)

  function ir(id) {
    onNavegar(id)
    setAbierto(false)
  }

  return (
    <header className="cabecera">
      <div className="cabecera-interior">
        <button className="marca" onClick={() => ir("tienda")}>
          <img src="/logo.svg" alt="" />
          <span>
            <h1>Letras Andinas</h1>
            <small>Libros y útiles</small>
          </span>
        </button>

        <nav className="nav">
          {ENLACES.map((e) => (
            <button key={e.id} onClick={() => ir(e.id)} className={vista === e.id ? "activo" : ""}>
              {e.texto}
            </button>
          ))}
        </nav>

        <button
          className="menu-movil"
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir menú"
          aria-expanded={abierto}
        >
          {abierto ? "Cerrar" : "Menú"}
        </button>
      </div>

      {abierto && (
        <nav className="nav nav-movil">
          {ENLACES.map((e) => (
            <button key={e.id} onClick={() => ir(e.id)} className={vista === e.id ? "activo" : ""}>
              {e.texto}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
