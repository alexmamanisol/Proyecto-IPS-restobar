"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Pagos", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            monto: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            metodo_pago: {
                type: Sequelize.ENUM("efectivo", "tarjeta", "transferencia", "yape"),
                allowNull: false,
            },
            estado: {
                type: Sequelize.ENUM("pendiente", "completado", "anulado"),
                defaultValue: "completado",
            },
            referencia: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.createTable("Facturas", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tipo: {
                type: Sequelize.ENUM("factura", "boleta"),
                allowNull: false,
                defaultValue: "boleta",
            },
            numero: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            cliente_nombre: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cliente_ruc: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            subtotal: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            igv: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            total: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            pago_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Pagos",
                    key: "id",
                },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.createTable("Gastos", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            descripcion: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            categoria: {
                type: Sequelize.ENUM(
                    "insumos",
                    "mantenimiento",
                    "alquiler",
                    "pagos_externos",
                    "impuestos",
                    "otros"
                ),
                allowNull: false,
            },
            monto: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            fecha: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            comprobante: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Facturas");
        await queryInterface.dropTable("Pagos");
        await queryInterface.dropTable("Gastos");
    },
};