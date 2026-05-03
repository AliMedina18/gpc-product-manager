const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Lectura pública
router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// Escritura protegida por JWT
router.post("/", authMiddleware, productController.create);
router.put("/:id", authMiddleware, productController.update);
router.delete("/:id", authMiddleware, productController.remove);

module.exports = router;
