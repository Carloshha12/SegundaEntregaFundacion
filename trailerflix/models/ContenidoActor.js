const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Tabla intermedia: un contenido tiene muchos actores y un actor participa en muchos contenidos
const ContenidoActor = sequelize.define("contenido_actores", {
  idContenido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  idActor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = ContenidoActor;
