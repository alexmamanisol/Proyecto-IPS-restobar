const asyncHandler = require("express-async-handler");
const db = require("../models");
const Receta = db.Receta;
const Product = db.Product;

exports.obtenerRecetas = asyncHandler(async (req, res) => {
    const recetas = await Receta.findAll({
        include: [{ model: Product, as: "producto" }],
        order: [["productId", "ASC"]],
    });
    res.json(recetas);
});

exports.obtenerRecetaDeProducto = asyncHandler(async (req, res) => {
    const recetas = await Receta.findAll({
        where: { productId: req.params.productId },
        include: [{ model: Product, as: "producto" }],
    });
    res.json(recetas);
});

exports.guardarReceta = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { ingredientes } = req.body;

    await Receta.destroy({ where: { productId } });

    if (ingredientes && ingredientes.length > 0) {
        const nuevos = ingredientes.map((ing) => ({
            productId: parseInt(productId),
            ingrediente: ing.ingrediente,
            cantidad: ing.cantidad,
            unidad: ing.unidad,
        }));
        await Receta.bulkCreate(nuevos);
    }

    const creados = await Receta.findAll({ where: { productId } });
    res.json(creados);
});
