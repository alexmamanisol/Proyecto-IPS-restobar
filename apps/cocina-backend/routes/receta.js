const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const csv = require("csv-parser");
const { Readable } = require("stream");
const multer = require("multer");
const storage = multer.memoryStorage(); // o diskStorage(...)
const upload = multer({ storage });

const {
    obtenerRecetas,
    obtenerRecetaDeProducto,
    guardarReceta,
    subirCSV,
} = require("../controllers/receta");

router.get("/", protect, obtenerRecetas);
router.get("/:productId", protect, obtenerRecetaDeProducto);
router.put("/:productId", protect, guardarReceta);
router.post("/upload", protect, upload.single("csv"), subirCSV);

module.exports = router;
