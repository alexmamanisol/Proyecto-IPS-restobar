"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ColaCoccion extends Model {
        static associate(models) {
            ColaCoccion.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "producto",
            });
            ColaCoccion.hasMany(models.EventoCola, {
                foreignKey: "colaCoccionId",
                as: "eventos",
            });
        }
    }
    ColaCoccion.init(
        {
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            estado: {
                type: DataTypes.ENUM("pending", "cooking", "completed"),
                defaultValue: "pending",
            },
            iniciadoEn: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            completadoEn: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "ColaCoccion",
            tableName: "cola_coccion",
        }
    );
    return ColaCoccion;
};
