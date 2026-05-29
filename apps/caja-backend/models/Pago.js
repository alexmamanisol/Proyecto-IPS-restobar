"use strict";

module.exports = (sequelize, DataTypes) => {
    const Pago = sequelize.define("Pago", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        metodo_pago: {
            type: DataTypes.ENUM("efectivo", "tarjeta", "transferencia", "yape"),
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("pendiente", "completado", "anulado"),
            defaultValue: "completado",
        },
        referencia: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Pago.associate = (models) => {
        Pago.hasOne(models.Factura, { foreignKey: "pago_id" });
    };

    return Pago;
};