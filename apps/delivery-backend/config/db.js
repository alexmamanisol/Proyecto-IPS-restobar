const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT || "mysql",
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Base de datos conectada correctamente.");
        await sequelize.sync({ alter: true });
        console.log("Modelos sincronizados.");
    } catch (error) {
        console.error("Error al conectar la base de datos:", error.message);
    }
};

module.exports = { sequelize, connectDB };