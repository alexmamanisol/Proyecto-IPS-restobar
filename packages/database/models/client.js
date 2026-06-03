"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        static associate(models) {
            this.hasMany(models.Order, {
                foreignKey: "clientId",
                as: "orders",
            });
        }
    }
    Client.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            dni: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Client",
        }
    );
    return Client;
};
