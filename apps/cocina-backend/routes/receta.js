const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    obtenerRecetas,
    obtenerRecetaDeProducto,
    guardarReceta,
} = require("../controllers/receta");

router.get("/", protect, obtenerRecetas);
router.get("/:productId", protect, obtenerRecetaDeProducto);
router.put("/:productId", protect, guardarReceta);

module.exports = router;
