const asyncHandler = require("express-async-handler");
const db = require("../models");
const Order = db.Order;
const Product = db.Product;
const EventoCoccion = db.EventoCoccion;

exports.obtenerPedidosPendientes = asyncHandler(async (req, res) => {
    const pedidos = await Order.findAll({
        include: [
            {
                model: Product,
                as: "products",
                through: { attributes: ["quantity"] },
                include: [
                    {
                        model: EventoCoccion,
                        as: "eventosCoccion",
                        order: [["orden", "ASC"]],
                    },
                ],
            },
        ],
        order: [["createdAt", "ASC"]],
    });
    res.json(pedidos);
});
