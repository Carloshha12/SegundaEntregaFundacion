
const { connectToMongoDB, disconnectFromMongoDB } = require('./mongodb');

async function usarColeccion(res, operacion) {
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).send('Error al conectarse a MongoDB');
    return;
  }

  try {
    const db = client.db(process.env.DATABASE);
    const camiones = db.collection(process.env.COLLECTION);
    await operacion(camiones);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al procesar la solicitud');
  } finally {
    await disconnectFromMongoDB();
  }
}

module.exports = { usarColeccion };
