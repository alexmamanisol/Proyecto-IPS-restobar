const express = require("express");
const router = express.Router();
const { getFacturas, getFacturaById, createFactura } = require("../controllers/factura");

router.get("/", getFacturas);
router.get("/:id", getFacturaById);
router.post("/", createFactura);

module.exports = router;