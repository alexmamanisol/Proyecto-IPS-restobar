"use strict";

module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define("Factura", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: {
            type: DataTypes.ENUM("factura", "boleta"),
            allowNull: false,
            defaultValue: "boleta",
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cliente_nombre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cliente_ruc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        igv: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        pago_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Factura.associate = (models) => {
        Factura.belongsTo(models.Pago, { foreignKey: "pago_id" });
    };

    return Factura;
};