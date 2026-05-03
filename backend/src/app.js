require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/gpc", require("./routes/gpcRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// DB status
app.get("/status", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", db: "failed", message: error.message });
  }
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Error interno del servidor" });
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`),
);

module.exports = app;
