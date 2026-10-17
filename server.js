const express = require('express');
const { usarColeccion } = require('./src/coleccion');
const { disconnectFromMongoDB } = require('./src/mongodb');

const app = express();
const PORT = process.env.PORT || 3008;
const CAMPOS = ['id', 'patente', 'conductor', 'ruta', 'capacidad', 'anio', 'estado'];

app.use(express.json());

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido a la API de la Flota de Camiones 🚛');
});


app.get('/camiones', (req, res) =>
  usarColeccion(res, async (camiones) => {
    const lista = await camiones.find().toArray();
    res.status(200).json(lista);
  })
);


app.get('/camiones/ruta/:ruta', (req, res) =>
  usarColeccion(res, async (camiones) => {
    const ruta = req.params.ruta.trim();
    const lista = await camiones.find({ ruta: new RegExp(ruta, 'i') }).toArray();

    lista.length > 0
      ? res.status(200).json(lista)
      : res.status(404).send(`No hay camiones en la ruta ${ruta}`);
  })
);
app.get('/camiones/:id', (req, res) =>
  usarColeccion(res, async (camiones) => {
    const id = parseInt(req.params.id) || 0;
    const camion = await camiones.findOne({ id });

    camion
      ? res.status(200).json(camion)
      : res.status(404).send(`No existe un camión con id ${id}`);
  })
);

app.post('/camiones', (req, res) => {
  const nuevoCamion = req.body;
  if (!nuevoCamion || Object.keys(nuevoCamion).length === 0) {
    return res.status(400).send('Error en el formato de datos a crear');
  }

  const faltantes = CAMPOS.filter((campo) => nuevoCamion[campo] === undefined);
  if (faltantes.length > 0) {
    return res.status(400).send(`Faltan campos: ${faltantes.join(', ')}`);
  }

  return usarColeccion(res, async (camiones) => {
    const existente = await camiones.findOne({ id: nuevoCamion.id });
    if (existente) {
      return res.status(400).send(`Ya existe un camión con id ${nuevoCamion.id}`);
    }

    await camiones.insertOne(nuevoCamion);
    res.status(201).json(nuevoCamion);
  });
});


app.put('/camiones/:id', (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const cambios = req.body;
  if (!cambios || Object.keys(cambios).length === 0) {
    return res.status(400).send('Error en el formato de datos a modificar');
  }
  if (cambios._id !== undefined) {
    return res.status(400).send('No se puede modificar el _id');
  }

  return usarColeccion(res, async (camiones) => {
    const resultado = await camiones.updateOne({ id }, { $set: cambios });

    resultado.matchedCount > 0
      ? res.status(200).send(`Camión ${id} modificado`)
      : res.status(404).send(`No existe un camión con id ${id}`);
  });
});


app.delete('/camiones/:id', (req, res) =>
  usarColeccion(res, async (camiones) => {
    const id = parseInt(req.params.id) || 0;
    const resultado = await camiones.deleteOne({ id });

    resultado.deletedCount > 0
      ? res.status(200).send(`Camión ${id} eliminado`)
      : res.status(404).send(`No existe un camión con id ${id}`);
  })
);

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

process.on('SIGINT', async () => {
  await disconnectFromMongoDB();
  process.exit(0);
});
