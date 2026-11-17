const express = require("express");
const path = require("node:path");
const { Op } = require("sequelize");
require("dotenv").config();

const { sequelize, Categoria, Genero, Actor, Contenido } = require("./models");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Sirve los archivos estáticos de /public (CSS, JS). El index se envía desde la ruta "/"
app.use(express.static(path.join(__dirname, "public"), { index: false }));

// Relaciones que se traen junto con cada contenido
const RELACIONES = [
  { model: Categoria, attributes: ["nombre"] },
  { model: Genero, attributes: ["nombre"], through: { attributes: [] } },
  { model: Actor, attributes: ["nombreCompleto"], through: { attributes: [] } },
];

// Arma la respuesta con el mismo formato para todos los endpoints
const formatear = (contenido) => ({
  id: contenido.id,
  titulo: contenido.titulo,
  categoria: contenido.categoria.nombre,
  generos: contenido.generos.map((g) => g.nombre),
  reparto: contenido.actores.map((a) => a.nombreCompleto),
  resumen: contenido.resumen,
  temporadas: contenido.temporadas,
  poster: contenido.poster,
  trailer: contenido.trailer,
});

const buscarContenidos = async (where = {}) => {
  const lista = await Contenido.findAll({ where, include: RELACIONES, order: [["id", "ASC"]] });
  return lista.map(formatear);
};

// Busca los contenidos relacionados con un modelo (género o actor) cuyo campo contiene el texto.
// Primero obtiene los ids y después trae cada contenido completo, con todo su reparto y géneros
const buscarPorRelacion = async (modelo, campo, texto) => {
  const coincidencias = await Contenido.findAll({
    attributes: ["id"],
    include: [{ model: modelo, where: { [campo]: { [Op.like]: `%${texto}%` } }, attributes: [] }],
  });
  if (coincidencias.length === 0) return [];
  return buscarContenidos({ id: coincidencias.map((c) => c.id) });
};

// Busca un género o actor por nombre y lo crea si no existe
const buscarOCrear = async (modelo, campo, nombres, transaction) => {
  const registros = [];
  for (const nombre of nombres) {
    const [registro] = await modelo.findOrCreate({ where: { [campo]: nombre }, transaction });
    registros.push(registro);
  }
  return registros;
};

// Acepta la lista como array o como texto separado por comas ("Actor 1, Actor 2")
const aLista = (valor) =>
  (Array.isArray(valor) ? valor : String(valor).split(","))
    .map((v) => String(v).trim())
    .filter(Boolean);

// Valida el :id de la ruta. Si no es un entero responde 400
app.param("id", (req, res, next, valor) => {
  if (!/^\d+$/.test(valor)) {
    return res.status(400).json({ mensaje: `El id debe ser un número entero: "${valor}".` });
  }
  req.id = Number(valor);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/catalogo", async (req, res) => {
  res.json(await buscarContenidos());
});

// La collation utf8mb4_unicode_ci hace que las búsquedas no distingan mayúsculas ni acentos
app.get("/titulo/:title", async (req, res) => {
  const resultado = await buscarContenidos({ titulo: { [Op.like]: `%${req.params.title}%` } });

  if (resultado.length === 0) {
    return res
      .status(404)
      .json({ mensaje: `No se encontraron títulos que coincidan con "${req.params.title}".` });
  }
  res.json(resultado);
});

app.get("/categoria/:cat", async (req, res) => {
  const categoria = await Categoria.findOne({ where: { nombre: req.params.cat } });

  if (!categoria) {
    return res
      .status(404)
      .json({ mensaje: `No se encontró la categoría "${req.params.cat}". Probá con "serie" o "película".` });
  }
  res.json(await buscarContenidos({ idCategoria: categoria.idCategoria }));
});

app.get("/genero/:gen", async (req, res) => {
  const resultado = await buscarPorRelacion(Genero, "nombre", req.params.gen);

  if (resultado.length === 0) {
    return res
      .status(404)
      .json({ mensaje: `No se encontraron títulos del género "${req.params.gen}".` });
  }
  res.json(resultado);
});

app.get("/reparto/:act", async (req, res) => {
  const resultado = await buscarPorRelacion(Actor, "nombreCompleto", req.params.act);

  if (resultado.length === 0) {
    return res
      .status(404)
      .json({ mensaje: `No se encontraron títulos con "${req.params.act}" en el reparto.` });
  }
  res.json(resultado);
});

app.get("/trailer/:id", async (req, res) => {
  const item = await Contenido.findByPk(req.id, { attributes: ["id", "titulo", "trailer"] });

  if (!item) {
    return res
      .status(404)
      .json({ mensaje: `No existe ningún título con id "${req.id}".` });
  }

  const { id, titulo, trailer } = item;
  if (!trailer) {
    return res
      .status(404)
      .json({ id, titulo, mensaje: "El trailer de este título no está disponible." });
  }
  res.json({ id, titulo, trailer });
});

app.get("/contenido/:id", async (req, res) => {
  const [contenido] = await buscarContenidos({ id: req.id });

  if (!contenido) {
    return res
      .status(404)
      .json({ mensaje: `No existe ningún título con id "${req.id}".` });
  }
  res.json(contenido);
});

// Guarda los datos del body en un contenido nuevo o existente, dentro de una transacción
const guardarContenido = async (contenido, datos, res) => {
  const transaction = await sequelize.transaction();
  try {
    const campos = {};
    for (const campo of ["titulo", "resumen", "temporadas", "poster", "trailer"]) {
      if (datos[campo] !== undefined) campos[campo] = datos[campo];
    }

    if (datos.categoria !== undefined) {
      const categoria = await Categoria.findOne({ where: { nombre: datos.categoria }, transaction });
      if (!categoria) {
        await transaction.rollback();
        res.status(400).json({ mensaje: `La categoría "${datos.categoria}" no existe. Usá "serie" o "película".` });
        return null;
      }
      campos.idCategoria = categoria.idCategoria;
    }

    contenido = contenido
      ? await contenido.update(campos, { transaction })
      : await Contenido.create(campos, { transaction });

    if (datos.generos !== undefined) {
      await contenido.setGeneros(await buscarOCrear(Genero, "nombre", aLista(datos.generos), transaction), { transaction });
    }
    if (datos.reparto !== undefined) {
      await contenido.setActores(await buscarOCrear(Actor, "nombreCompleto", aLista(datos.reparto), transaction), { transaction });
    }

    await transaction.commit();
    const [guardado] = await buscarContenidos({ id: contenido.id });
    return guardado;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

app.post("/contenido", async (req, res) => {
  const datos = req.body;
  if (!datos || !datos.titulo || !datos.categoria) {
    return res
      .status(400)
      .json({ mensaje: 'Los campos "titulo" y "categoria" son obligatorios.' });
  }

  const creado = await guardarContenido(null, datos, res);
  if (creado) res.status(201).json(creado);
});

app.put("/contenido/:id", async (req, res) => {
  const datos = req.body;
  if (!datos || Object.keys(datos).length === 0) {
    return res
      .status(400)
      .json({ mensaje: "El body no puede estar vacío." });
  }
  if (datos.id !== undefined) {
    return res
      .status(400)
      .json({ mensaje: "No se puede modificar el id." });
  }

  const contenido = await Contenido.findByPk(req.id);
  if (!contenido) {
    return res
      .status(404)
      .json({ mensaje: `No existe ningún título con id "${req.id}".` });
  }

  const modificado = await guardarContenido(contenido, datos, res);
  if (modificado) res.json(modificado);
});

app.delete("/contenido/:id", async (req, res) => {
  // Las filas de contenido_generos y contenido_actores se borran en cascada
  const eliminados = await Contenido.destroy({ where: { id: req.id } });

  if (eliminados === 0) {
    return res
      .status(404)
      .json({ mensaje: `No existe ningún título con id "${req.id}".` });
  }
  res.json({ mensaje: `Título ${req.id} eliminado.` });
});

// Cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada." });
});

// Errores inesperados (por ejemplo, si se cae la conexión a la base)
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ mensaje: "Error interno del servidor." });
});

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("No se pudo conectar a MySQL:", error.message);
    process.exit(1);
  });
