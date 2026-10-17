const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URLSTRING;
const client = new MongoClient(URI);
let conexion = null;

async function connectToMongoDB() {
  if (!conexion) {
    conexion = client.connect()
      .then(() => {
        console.log('Conectado a MongoDB');
        return client;
      })
      .catch((error) => {
        console.error('Error al conectarse a MongoDB:', error.message);
        conexion = null;
        return null;
      });
  }
  return conexion;
}

async function disconnectFromMongoDB() {
  try {
    await client.close();
    conexion = null;
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error al desconectarse de MongoDB:', error.message);
  }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB };
