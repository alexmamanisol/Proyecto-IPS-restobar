"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tables = await queryInterface.showAllTables();
        if (!tables.includes("tiempos_coccion")) {
            await queryInterface.createTable("tiempos_coccion", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                productId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true,
                    references: {
                        model: "Products",
                        key: "id",
                    },
                    onDelete: "CASCADE",
                },
                principal: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                secundario: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("NOW()"),
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal("NOW()"),
                },
            });
        }
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("tiempos_coccion");
    },
};
