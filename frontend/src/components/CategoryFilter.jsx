import { Button } from "@/components/ui/button"

export default function CategoryFilter({ categorias, seleccionada, onSeleccionar }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={seleccionada === null ? "default" : "outline"}
        onClick={() => onSeleccionar(null)}
      >
        Todas
      </Button>
      {categorias.map((c) => (
        <Button
          key={c.id}
          variant={seleccionada === c.id ? "default" : "outline"}
          onClick={() => onSeleccionar(c.id)}
        >
          {c.nombre}
        </Button>
      ))}
    </div>
  )
}