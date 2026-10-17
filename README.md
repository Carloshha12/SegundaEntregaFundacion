# API Flota de Transporte de Crudo 🚛

API REST hecha con Node.js, Express y MongoDB Atlas para gestionar una flota de camiones que transportan crudo.

## Estructura de un documento

```json
{
  "id": 1,
  "patente": "AB123CD",
  "conductor": "Juan Pérez",
  "ruta": "Añelo - Neuquén Capital",
  "capacidad": 30000,
  "anio": 2020,
  "estado": "disponible"
}
```

`capacidad` está en litros. `estado` puede ser `en ruta`, `disponible` o `en taller`. Los datos iniciales están en `camiones.json`.

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

### Validaciones

- **POST:** el body tiene que incluir todos los campos (`id`, `patente`, `conductor`, `ruta`, `capacidad`, `anio`, `estado`). Si falta alguno devuelve `400 Faltan campos: ...`. Si ya existe un camión con ese `id` devuelve `400 Ya existe un camión con id ...`.
- **PUT:** el body no puede estar vacío ni incluir `_id`. En ese caso devuelve `400`.

### Ejemplos

```
GET http://localhost:3008/camiones/2
GET http://localhost:3008/camiones/ruta/zapala
```

> La búsqueda por ruta distingue tildes: `anelo` no encuentra "Añelo", hay que escribir `añelo`.

```
POST http://localhost:3008/camiones
Content-Type: application/json

{
  "id": 9,
  "patente": "AJ567ST",
  "conductor": "Pedro Sosa",
  "ruta": "Zapala - Neuquén Capital",
  "capacidad": 28000,
  "anio": 2024,
  "estado": "disponible"
}
```
