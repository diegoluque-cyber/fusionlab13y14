import { useState } from "react"
import Header from "@/components/Header"
import Home from "@/pages/Home"
import Inventario from "@/pages/Inventario"

export default function App() {
  const [vista, setVista] = useState("tienda")

  return (
    <div className="sitio">
      <Header vista={vista} onNavegar={setVista} />
      {vista === "tienda" ? <Home /> : <Inventario />}
      <footer className="pie">
        <span>Letras Andinas · librería</span>
        <span>Lima</span>
      </footer>
    </div>
  )
}
