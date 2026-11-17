const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categoria = sequelize.define("categorias", {
  idCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
});

module.exports = Categoria;
