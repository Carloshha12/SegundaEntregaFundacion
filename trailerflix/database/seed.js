// Migra los datos de trailerflix.json a MySQL.
// Crea la base si no existe, recrea las tablas y carga todo de nuevo.
// Uso: npm run seed
const path = require("node:path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const trailerflix = require("./trailerflix.json");
// trailerflix.json no trae géneros: se asignan por id en generos.json
const generosPorId = require("./generos.json");

async function crearBaseSiNoExiste() {
  const conexion = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  await conexion.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  await conexion.end();
}

// Devuelve el registro con ese nombre, creándolo si todavía no existe
async function buscarOCrear(modelo, campo, valor) {
  const [registro] = await modelo.findOrCreate({ where: { [campo]: valor } });
  return registro;
}

async function migrar() {
  await crearBaseSiNoExiste();

  const { sequelize, Categoria, Genero, Actor, Contenido } = require(
    path.join(__dirname, "..", "models"),
  );
  await sequelize.sync({ force: true });

  for (const item of trailerflix) {
    const categoria = await buscarOCrear(Categoria, "nombre", item.categoria);

    const contenido = await Contenido.create({
      id: item.id,
      titulo: item.titulo,
      resumen: item.resumen,
      temporadas: item.temporadas,
      poster: item.poster,
      trailer: item.trailer || null,
      idCategoria: categoria.idCategoria,
    });

    const nombresActores = item.reparto.split(",").map((n) => n.trim()).filter(Boolean);
    const actores = [];
    for (const nombre of nombresActores) {
      actores.push(await buscarOCrear(Actor, "nombreCompleto", nombre));
    }
    await contenido.setActores(actores);

    const generos = [];
    for (const nombre of generosPorId[item.id] || []) {
      generos.push(await buscarOCrear(Genero, "nombre", nombre));
    }
    await contenido.setGeneros(generos);
  }

  console.log(`Migración completa: ${trailerflix.length} títulos cargados.`);
  await sequelize.close();
}

migrar().catch((error) => {
  console.error("Error en la migración:", error.message);
  process.exit(1);
});
