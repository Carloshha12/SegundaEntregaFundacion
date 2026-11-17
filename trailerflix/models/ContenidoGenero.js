const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Tabla intermedia: un contenido tiene muchos géneros y un género muchos contenidos
const ContenidoGenero = sequelize.define("contenido_generos", {
  idContenido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  idGenero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = ContenidoGenero;
