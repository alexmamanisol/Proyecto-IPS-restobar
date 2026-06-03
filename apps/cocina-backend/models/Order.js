"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsToMany(models.Product, {
                through: "OrderProduct",
                foreignKey: "orderId",
                as: "products",
            });
        }
    }
    Order.init(
        {
            total: DataTypes.DOUBLE,
            isPaid: DataTypes.BOOLEAN,
            delivery: DataTypes.BOOLEAN,
            note: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            clientId: DataTypes.INTEGER,
            tableId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
