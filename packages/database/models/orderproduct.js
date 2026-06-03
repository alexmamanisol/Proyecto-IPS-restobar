"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class OrderProduct extends Model {
        static associate(models) {
            this.belongsTo(models.Order, { foreignKey: "orderId" });
            this.belongsTo(models.Product, { foreignKey: "productId" });
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
