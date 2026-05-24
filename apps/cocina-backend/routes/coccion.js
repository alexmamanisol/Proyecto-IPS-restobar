const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    obtenerCola,
    agregarACola,
    avanzarEvento,
    obtenerPendientes,
    obtenerTerminados,
} = require("../controllers/coccion");

router.get("/", protect, obtenerCola);
router.get("/pendientes", protect, obtenerPendientes);
router.get("/terminados", protect, obtenerTerminados);
router.post("/", protect, agregarACola);
router.put("/:id/avanzar", protect, avanzarEvento);

module.exports = router;
