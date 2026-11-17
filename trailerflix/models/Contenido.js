const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contenido = sequelize.define("contenido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  resumen: {
    type: DataTypes.TEXT,
  },
  // Solo las series tienen temporadas; en las películas queda en null
  temporadas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  poster: {
    type: DataTypes.STRING(255),
  },
  trailer: {
    type: DataTypes.STRING(255),
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Contenido;
