const productService = require("../services/productService");
const { z } = require("zod");

const createProductSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  precio: z.preprocess(
    (value) => Number(value),
    z.number().positive("El precio debe ser mayor a 0"),
  ),
  brickId: z.preprocess(
    (value) => Number(value),
    z.number().int().positive("La clasificación GPC es requerida"),
  ),
});

const updateProductSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").optional(),
  descripcion: z.string().optional(),
  precio: z.preprocess(
    (value) => (value === undefined ? undefined : Number(value)),
    z.number().positive("El precio debe ser mayor a 0").optional(),
  ),
  brickId: z.preprocess(
    (value) => (value === undefined ? undefined : Number(value)),
    z.number().int().positive("La clasificación GPC es requerida").optional(),
  ),
});

function formatZodErrors(error) {
  return Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] || "",
    ]),
  );
}

async function getAll(req, res, next) {
  try {
    const data = await productService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const data = await productService.getById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const result = createProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        fieldErrors: formatZodErrors(result.error),
      });
    }
    const product = await productService.create(result.data);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const result = updateProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        fieldErrors: formatZodErrors(result.error),
      });
    }
    const product = await productService.update(req.params.id, result.data);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const result = await productService.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove };
