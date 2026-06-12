const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Pedido = sequelize.define("Pedido", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nota: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM("Pendiente", "En camino", "Entregado"),
        defaultValue: "Pendiente",
    },
    metodoPago: {
        type: DataTypes.ENUM("tarjeta", "efectivo", "transferencia"),
        allowNull: true,
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    productos: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

module.exports = Pedido;