export default function Header() {
  return (
    <header className="bg-amber-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo Letras Andinas" className="h-10 w-10" />
          <h1 className="text-2xl font-bold tracking-tight">Letras Andinas</h1>
        </div>
        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">Inicio</a>
          <a href="#catalogo" className="hover:underline">Catálogo</a>
          <a href="#" className="hover:underline">Contacto</a>
        </nav>
      </div>
    </header>
  )
}
