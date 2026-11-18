import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProductCard({ nombre, descripcion, precio, imagen, categoria, cantidad }) {
  return (
    <Card className="overflow-hidden">
      <img src={imagen} alt={nombre} className="h-48 w-full object-cover" />
      <CardHeader>
        <Badge variant="secondary" className="w-fit">{categoria}</Badge>
        <CardTitle>{nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{descripcion}</p>
        <p className="text-lg font-bold text-amber-900">S/ {precio}</p>
        <p className="text-xs text-gray-500">Stock disponible: {cantidad}</p>
      </CardContent>
    </Card>
  )
}
