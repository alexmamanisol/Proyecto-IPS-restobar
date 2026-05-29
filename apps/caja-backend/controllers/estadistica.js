const asyncHandler = require("express-async-handler");
const { Pago, Factura, Gasto } = require("../models");
const { Op, fn, col, literal } = require("sequelize");

// GET /api/caja/estadisticas/ingresos
const getIngresos = asyncHandler(async (req, res) => {
    const { periodo } = req.query; // dia, semana, mes, año

    let formato;
    if (periodo === "dia") formato = "%Y-%m-%d";
    else if (periodo === "semana") formato = "%Y-%u";
    else if (periodo === "mes") formato = "%Y-%m";
    else formato = "%Y";

    const ingresos = await Pago.findAll({
        attributes: [
            [fn("DATE_FORMAT", col("createdAt"), formato), "periodo"],
            [fn("SUM", col("monto")), "total"],
            [fn("COUNT", col("id")), "cantidad"],
        ],
        where: { estado: "completado" },
        group: [literal("periodo")],
        order: [[literal("periodo"), "ASC"]],
    });

    res.json(ingresos);
});

// GET /api/caja/estadisticas/metodos-pago
const getMetodosPago = asyncHandler(async (req, res) => {
    const metodos = await Pago.findAll({
        attributes: [
            "metodo_pago",
            [fn("COUNT", col("id")), "cantidad"],
            [fn("SUM", col("monto")), "total"],
        ],
        where: { estado: "completado" },
        group: ["metodo_pago"],
    });

    res.json(metodos);
});

// GET /api/caja/estadisticas/gastos
const getResumenGastos = asyncHandler(async (req, res) => {
    const gastos = await Gasto.findAll({
        attributes: [
            "categoria",
            [fn("SUM", col("monto")), "total"],
            [fn("COUNT", col("id")), "cantidad"],
        ],
        group: ["categoria"],
    });

    res.json(gastos);
});

// GET /api/caja/estadisticas/resumen
const getResumenGeneral = asyncHandler(async (req, res) => {
    const totalIngresos = await Pago.sum("monto", {
        where: { estado: "completado" },
    });
    const totalGastos = await Gasto.sum("monto");
    const totalFacturas = await Factura.count();
    const totalPagos = await Pago.count({ where: { estado: "completado" } });

    res.json({
        totalIngresos: totalIngresos || 0,
        totalGastos: totalGastos || 0,
        ganancia: (totalIngresos || 0) - (totalGastos || 0),
        totalFacturas,
        totalPagos,
    });
});

module.exports = { getIngresos, getMetodosPago, getResumenGastos, getResumenGeneral };