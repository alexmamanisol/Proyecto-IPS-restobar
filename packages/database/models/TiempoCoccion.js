"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class TiempoCoccion extends Model {
        static associate(models) {
            TiempoCoccion.belongsTo(models.Product, {
                foreignKey: "productId",
                as: "producto",
            });
        }
    }
    TiempoCoccion.init(
        {
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            principal: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            secundario: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "TiempoCoccion",
            tableName: "tiempos_coccion",
        }
    );
    return TiempoCoccion;
};
