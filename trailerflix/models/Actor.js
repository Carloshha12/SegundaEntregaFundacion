const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Actor = sequelize.define("actores", {
  idActor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreCompleto: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
});

module.exports = Actor;
