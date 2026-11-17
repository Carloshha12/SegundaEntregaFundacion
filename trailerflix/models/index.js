const sequelize = require("../config/database");
const Categoria = require("./Categoria");
const Genero = require("./Genero");
const Actor = require("./Actor");
const Contenido = require("./Contenido");
const ContenidoGenero = require("./ContenidoGenero");
const ContenidoActor = require("./ContenidoActor");

// Una categoría tiene muchos contenidos (1 a N).
// RESTRICT: no se puede borrar una categoría que todavía tiene contenido
Categoria.hasMany(Contenido, { foreignKey: "idCategoria", onDelete: "RESTRICT" });
Contenido.belongsTo(Categoria, { foreignKey: "idCategoria", onDelete: "RESTRICT" });

// Contenido y géneros (N a N)
Contenido.belongsToMany(Genero, {
  through: ContenidoGenero,
  foreignKey: "idContenido",
  otherKey: "idGenero",
});
Genero.belongsToMany(Contenido, {
  through: ContenidoGenero,
  foreignKey: "idGenero",
  otherKey: "idContenido",
});

// Contenido y actores (N a N)
Contenido.belongsToMany(Actor, {
  through: ContenidoActor,
  foreignKey: "idContenido",
  otherKey: "idActor",
});
Actor.belongsToMany(Contenido, {
  through: ContenidoActor,
  foreignKey: "idActor",
  otherKey: "idContenido",
});

module.exports = {
  sequelize,
  Categoria,
  Genero,
  Actor,
  Contenido,
  ContenidoGenero,
  ContenidoActor,
};
