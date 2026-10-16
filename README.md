# API Flota de Transporte de Crudo 🚛

API REST hecha con Node.js, Express y MongoDB Atlas para gestionar una flota de camiones que transportan crudo.

## Estructura de un documento

```json
{
  "id": 1,
  "patente": "AB123CD",
  "conductor": "Juan Pérez",
  "ruta": "Neuquén - Bahía Blanca",
  "capacidadLitros": 30000,
  "kilometraje": 152300,
  "estado": "en ruta",
  "icono": "🚛"
}
```

`estado` puede ser `en ruta`, `disponible` o `en taller`. Los datos iniciales están en `camiones.json`.

## Instalación

1. Instalar dependencias:
   ```
   npm install
   ```
2. Copiar `.env.example` como `.env` y completar los datos de conexión a MongoDB Atlas.
3. Importar `camiones.json` en la colección (Atlas → *Add Data* → *Import JSON or CSV file*).
4. Iniciar el servidor:
   ```
   npm start
   ```
   o en modo desarrollo (se reinicia al guardar cambios):
   ```
   npm run dev
   ```

El servidor queda escuchando en `http://localhost:3008`.

## Endpoints

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/` | Mensaje de bienvenida | 200 |
| GET | `/camiones` | Lista todos los camiones | 200, 500 |
| GET | `/camiones/:id` | Devuelve un camión por id | 200, 404, 500 |
| GET | `/camiones/ruta/:ruta` | Busca camiones por ruta (coincidencia parcial, sin distinguir mayúsculas) | 200, 404, 500 |
| POST | `/camiones` | Crea un camión (JSON en el body) | 201, 400, 500 |
| PUT | `/camiones/:id` | Modifica los campos enviados de un camión | 200, 400, 404, 500 |
| DELETE | `/camiones/:id` | Elimina un camión | 200, 404, 500 |

Cualquier otra ruta devuelve `404 Ruta no encontrada`.

### Ejemplos

```
GET http://localhost:3008/camiones/2
GET http://localhost:3008/camiones/ruta/mendoza
```

> La búsqueda por ruta distingue tildes: `neuquen` no encuentra "Neuquén", hay que escribir `neuquén`.

```
POST http://localhost:3008/camiones
Content-Type: application/json

{
  "id": 5,
  "patente": "AF345KL",
  "conductor": "Pedro Sosa",
  "ruta": "Plaza Huincul - Neuquén",
  "capacidadLitros": 27000,
  "kilometraje": 45000,
  "estado": "disponible",
  "icono": "🚛"
}
```
