const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAll() {
  return prisma.product.findMany({
    include: {
      brick: {
        include: {
          class: {
            include: {
              family: {
                include: { segment: true },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getById(id) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      brick: {
        include: {
          class: {
            include: {
              family: {
                include: { segment: true },
              },
            },
          },
        },
      },
    },
  });
  if (!product) throw Object.assign(new Error("Producto no encontrado"), { status: 404 });
  return product;
}

async function create(data) {
  const { nombre, descripcion, precio, brickId } = data;
  if (!nombre || !precio || !brickId) {
    throw Object.assign(new Error("nombre, precio y brickId son requeridos"), { status: 400 });
  }

  const brickExists = await prisma.brick.findUnique({ where: { id: Number(brickId) } });
  if (!brickExists) throw Object.assign(new Error("Brick no encontrado"), { status: 404 });

  return prisma.product.create({
    data: {
      nombre,
      descripcion: descripcion || null,
      precio: Number(precio),
      brickId: Number(brickId),
    },
  });
}

async function update(id, data) {
  const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!existing) throw Object.assign(new Error("Producto no encontrado"), { status: 404 });

  const { nombre, descripcion, precio, brickId } = data;
  return prisma.product.update({
    where: { id: Number(id) },
    data: {
      ...(nombre && { nombre }),
      ...(descripcion !== undefined && { descripcion }),
      ...(precio !== undefined && { precio: Number(precio) }),
      ...(brickId && { brickId: Number(brickId) }),
    },
  });
}

async function remove(id) {
  const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!existing) throw Object.assign(new Error("Producto no encontrado"), { status: 404 });
  await prisma.product.delete({ where: { id: Number(id) } });
  return { message: "Producto eliminado" };
}

module.exports = { getAll, getById, create, update, remove };
