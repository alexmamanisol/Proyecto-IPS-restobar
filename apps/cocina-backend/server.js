const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const coccionRoutes = require("./routes/coccion");
const tiempoRoutes = require("./routes/tiempo");
const recetaRoutes = require("./routes/receta");

app.use("/api/coccion/cola", coccionRoutes);
app.use("/api/coccion/tiempos", tiempoRoutes);
app.use("/api/coccion/recetas", recetaRoutes);

app.get("/api/coccion", (req, res) => {
    res.json({ message: "Cocina API is running" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.COCCION_PORT || 5002;

app.listen(PORT, () => {
    console.log(`Cocina server running on port ${PORT}`);
});
