const { Sequelize } = require("sequelize");
require("dotenv").config();

// Conexión a MySQL con los datos del .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    define: {
      // utf8mb4_unicode_ci compara sin distinguir mayúsculas ni acentos
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      timestamps: false,
      freezeTableName: true,
    },
  },
);

module.exports = sequelize;
