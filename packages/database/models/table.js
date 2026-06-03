"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Table extends Model {
        static associate(models) {
            this.hasMany(models.Order, { foreignKey: "tableId", as: "orders" });
        }
    }
    Table.init(
        {
            name: DataTypes.STRING,
            occupied: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Table",
        }
    );
    return Table;
};
