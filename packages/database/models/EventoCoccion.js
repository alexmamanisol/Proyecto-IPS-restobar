"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EventoCoccion extends Model {
        static associate(models) {
            EventoCoccion.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "producto",
            });
        }
    }
    EventoCoccion.init(
        {
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            duracionSegundos: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            orden: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                primarykey: true,
            },
        },
        {
            sequelize,
            modelName: "EventoCoccion",
            tableName: "eventos_coccion",
        }
    );
    return EventoCoccion;
};
