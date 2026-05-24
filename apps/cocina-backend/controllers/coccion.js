const asyncHandler = require("express-async-handler");
const db = require("../models");
const ColaCoccion = db.ColaCoccion;
const EventoCola = db.EventoCola;
const EventoCoccion = db.EventoCoccion;
const Product = db.Product;
const { Op } = require("sequelize");

exports.obtenerCola = asyncHandler(async (req, res) => {
    const items = await ColaCoccion.findAll({
        include: [
            { model: Product, as: "producto" },
            {
                model: EventoCola,
                as: "eventos",
                include: [{ model: EventoCoccion, as: "eventoCoccion" }],
            },
        ],
        order: [["createdAt", "ASC"]],
    });
    res.json(items);
});

exports.agregarACola = asyncHandler(async (req, res) => {
    const { orderId, productId } = req.body;

    const existente = await ColaCoccion.findOne({ where: { orderId, productId, estado: { [Op.ne]: "completed" } } });
    if (existente) return res.status(400).json({ message: "Producto ya en cola" });

    const eventos = await EventoCoccion.findAll({
        where: { productId },
        order: [["orden", "ASC"]],
    });

    const cola = await ColaCoccion.create({
        orderId, productId, estado: "pending", iniciadoEn: new Date(),
    });

    if (eventos.length > 0) {
        const eventosCola = eventos.map((e, i) => ({
            colaCoccionId: cola.id,
            eventoCoccionId: e.id,
            estado: i === 0 ? "cooking" : "pending",
            iniciadoEn: i === 0 ? new Date() : null,
        }));
        await EventoCola.bulkCreate(eventosCola);
    } else {
        cola.estado = "completed";
        cola.completadoEn = new Date();
        await cola.save();
    }

    const resultado = await ColaCoccion.findByPk(cola.id, {
        include: [
            { model: Product, as: "producto" },
            {
                model: EventoCola,
                as: "eventos",
                include: [{ model: EventoCoccion, as: "eventoCoccion" }],
            },
        ],
    });
    res.json(resultado);
});

exports.avanzarEvento = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const evento = await EventoCola.findByPk(id, {
        include: [{ model: EventoCoccion, as: "eventoCoccion" }],
    });
    if (!evento) {
        res.status(404);
        throw new Error("Evento no encontrado");
    }

    evento.estado = "completed";
    evento.completadoEn = new Date();
    await evento.save();

    const cola = await ColaCoccion.findByPk(evento.colaCoccionId, {
        include: [{ model: EventoCola, as: "eventos" }],
    });

    const pendingEvents = cola.eventos.filter((e) => e.estado !== "completed");

    if (pendingEvents.length === 0) {
        cola.estado = "completed";
        cola.completadoEn = new Date();
        await cola.save();
        await actualizarPromedio(cola.productId);
    } else {
        const nextEvent = pendingEvents[0];
        nextEvent.estado = "cooking";
        nextEvent.iniciadoEn = new Date();
        await nextEvent.save();
    }

    const resultado = await ColaCoccion.findByPk(cola.id, {
        include: [
            { model: Product, as: "producto" },
            {
                model: EventoCola,
                as: "eventos",
                include: [{ model: EventoCoccion, as: "eventoCoccion" }],
            },
        ],
    });
    res.json(resultado);
});

async function actualizarPromedio(productId) {
    const completados = await ColaCoccion.findAll({
        where: { productId, estado: "completed", completadoEn: { [Op.ne]: null } },
    });

    if (completados.length === 0) return;

    const TiempoCoccion = db.TiempoCoccion;
    const totalSecs = completados.reduce((acc, c) => {
        return acc + (new Date(c.completadoEn) - new Date(c.iniciadoEn)) / 1000;
    }, 0);
    const promedio = Math.round(totalSecs / completados.length);

    await TiempoCoccion.upsert({
        productId,
        tiempoPromedio: promedio,
        configuradoPorUsuario: false,
    });
}

exports.obtenerPendientes = asyncHandler(async (req, res) => {
    const items = await ColaCoccion.findAll({
        where: { estado: { [Op.ne]: "completed" } },
        include: [
            { model: Product, as: "producto" },
            {
                model: EventoCola,
                as: "eventos",
                include: [{ model: EventoCoccion, as: "eventoCoccion" }],
            },
        ],
        order: [["createdAt", "ASC"]],
    });
    res.json(items);
});

exports.obtenerTerminados = asyncHandler(async (req, res) => {
    const items = await ColaCoccion.findAll({
        where: { estado: "completed" },
        include: [
            { model: Product, as: "producto" },
            {
                model: EventoCola,
                as: "eventos",
                include: [{ model: EventoCoccion, as: "eventoCoccion" }],
            },
        ],
        order: [["completadoEn", "DESC"]],
        limit: 50,
    });
    res.json(items);
});
