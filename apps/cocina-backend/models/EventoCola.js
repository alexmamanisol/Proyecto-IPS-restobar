"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class EventoCola extends Model {
        static associate(models) {
            EventoCola.belongsTo(models.ColaCoccion, {
                foreignKey: "colaCoccionId",
                as: "colaCoccion",
            });
            EventoCola.belongsTo(models.EventoCoccion, {
                foreignKey: "eventoCoccionId",
                as: "eventoCoccion",
            });
        }
    }
    EventoCola.init(
        {
            colaCoccionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            eventoCoccionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            estado: {
                type: DataTypes.ENUM("pending", "cooking", "completed"),
                defaultValue: "pending",
            },
            iniciadoEn: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            completadoEn: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "EventoCola",
            tableName: "eventos_cola",
        }
    );
    return EventoCola;
};
