"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Receta extends Model {
        static associate(models) {
            Receta.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "producto",
            });
        }
    }
    Receta.init(
        {
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ingrediente: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            unidad_medida: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Receta",
            tableName: "recetas",
        }
    );
    return Receta;
};
