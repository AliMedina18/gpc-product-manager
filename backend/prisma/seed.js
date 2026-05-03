const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed básico con datos GPC de ejemplo
  const segment = await prisma.segment.upsert({
    where: { nombre: "Alimentos y Bebidas" },
    update: {},
    create: { nombre: "Alimentos y Bebidas" },
  });

  const family = await prisma.family.upsert({
    where: { nombre_segmentId: { nombre: "Productos Lácteos", segmentId: segment.id } },
    update: {},
    create: { nombre: "Productos Lácteos", segmentId: segment.id },
  });

  const cls = await prisma.class.upsert({
    where: { nombre_familyId: { nombre: "Leche y Crema", familyId: family.id } },
    update: {},
    create: { nombre: "Leche y Crema", familyId: family.id },
  });

  const brick = await prisma.brick.upsert({
    where: { nombre_classId: { nombre: "Whole Milk", classId: cls.id } },
    update: {},
    create: { nombre: "Whole Milk", classId: cls.id },
  });

  await prisma.attribute.upsert({
    where: { nombre_brickId: { nombre: "Capacidad", brickId: brick.id } },
    update: {},
    create: { nombre: "Capacidad", brickId: brick.id },
  });

  await prisma.product.createMany({
    data: [
      { nombre: "Leche Entera 1L", descripcion: "Leche entera pasteurizada", precio: 2.5, brickId: brick.id },
      { nombre: "Leche Entera 500ml", descripcion: "Leche entera pequeña", precio: 1.5, brickId: brick.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed completado");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
