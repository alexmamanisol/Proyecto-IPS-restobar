"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            this.belongsTo(models.Category, {
                foreignKey: "categoryId",
                as: "category",
            });
            this.belongsToMany(models.Order, {
                through: "OrderProduct",
                foreignKey: "productId",
                as: "order",
            });
            this.hasMany(models.TiempoCoccion, {
                foreignKey: "productId",
                as: "tiemposCoccion",
            });
            this.hasMany(models.EventoCoccion, {
                foreignKey: "productId",
                as: "eventosCoccion",
            });
            this.hasMany(models.Receta, {
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
