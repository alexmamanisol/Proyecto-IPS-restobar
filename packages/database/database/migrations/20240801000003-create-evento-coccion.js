"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tables = await queryInterface.showAllTables();
        if (!tables.includes("eventos_coccion")) {
            await queryInterface.createTable("eventos_coccion", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                productId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: "Products",
                        key: "id",
                    },
                    onDelete: "CASCADE",
                },
                nombre: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                duracionSegundos: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                },
                orden: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
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
        await queryInterface.dropTable("eventos_coccion");
    },
};
