"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.ColaCoccion, {
                foreignKey: "productId",
                as: "colasCoccion",
            });
            Product.hasMany(models.TiempoCoccion, {
                foreignKey: "productId",
                as: "tiemposCoccion",
            });
            Product.hasMany(models.EventoCoccion, {
                foreignKey: "productId",
                as: "eventosCoccion",
            });
            Product.hasMany(models.Receta, {
                foreignKey: "productId",
                as: "recetas",
            });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.DOUBLE,
            stock: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
