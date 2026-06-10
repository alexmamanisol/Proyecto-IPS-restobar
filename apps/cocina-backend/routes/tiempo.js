const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    obtenerTiempos,
    actualizarTiempo,
    obtenerEventosDeProducto,
    configurarEventos,
    obtenerProductos,
} = require("../controllers/tiempo");

router.get("/", protect, obtenerTiempos);
router.get("/productos", protect, obtenerProductos);
router.get("/:productId/eventos", protect, obtenerEventosDeProducto);
router.put("/product/:productId", protect, actualizarTiempo);
router.put("/:productId/eventos", protect, configurarEventos);

module.exports = router;
