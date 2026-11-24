# Letras Andinas - Tienda virtual
E-commerce con ReactJS (Vite, Tailwind, shadcn/ui) y Django REST Framework.

**Lab 13:** estructura (catálogo, categorías, API REST).
**Lab 14:** diseño responsivo, búsqueda/filtros/orden, promociones y descuentos, gestión de inventario y recomendaciones.

## Backend
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py shell -c "exec(open('cargar_datos.py', encoding='utf-8-sig').read())"
python manage.py runserver
```

## Frontend
```
cd frontend
npm install
npm run dev
```

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/categorias/ | Categorías |
| GET | /api/productos/?search=&categoria=&en_oferta=true&ordering=precio | Productos con búsqueda, filtros y orden |
| GET | /api/productos/{id}/recomendados/ | Recomendaciones (misma categoría + precio cercano + ofertas) |
| GET | /api/promociones/ | Promociones activas |
| GET | /api/inventario/ | Resumen de inventario |

Panel de administración: http://127.0.0.1:8000/admin (stock, descuentos y promociones).
