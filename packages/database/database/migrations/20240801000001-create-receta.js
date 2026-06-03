"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tables = await queryInterface.showAllTables();
        if (!tables.includes("recetas")) {
            await queryInterface.createTable("recetas", {
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
                ingrediente: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                cantidad: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
                unidad_medida: {
                    type: Sequelize.STRING,
                    allowNull: false,
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
        await queryInterface.dropTable("recetas");
    },
};
