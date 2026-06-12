"use strict";

module.exports = (sequelize, DataTypes) => {
    const Gasto = sequelize.define("Gasto", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoria: {
            type: DataTypes.ENUM(
                "insumos",
                "mantenimiento",
                "alquiler",
                "pagos_externos",
                "impuestos",
                "otros"
            ),
            allowNull: false,
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        comprobante: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Gasto;
};