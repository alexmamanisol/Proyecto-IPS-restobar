"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderProduct extends Model {
        static associate(models) {
            OrderProduct.belongsTo(models.Order, { foreignKey: "orderId" });
            OrderProduct.belongsTo(models.Product, { foreignKey: "productId" });
        }
    }
    OrderProduct.init(
        {
            orderId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "OrderProduct",
            timestamps: false,
        }
    );
    return OrderProduct;
};
