const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    await prisma.role.upsert({
      where: { name: "ADMIN" },
      update: {},
      create: { name: "ADMIN" },
    });

    await prisma.role.upsert({
      where: { name: "EMPLOYEE" },
      update: {},
      create: { name: "EMPLOYEE" },
    });

    const adminExists = await prisma.user.findUnique({
      where: { email: "admin@gpc.com" },
    });

    if (adminExists) {
      console.log("✅ Usuario admin ya existe");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.create({
      data: {
        email: "admin@gpc.com",
        password: hashedPassword,
        role: {
          connect: { name: "ADMIN" },
        },
      },
      include: { role: true },
    });

    console.log("✅ Usuario admin creado exitosamente");
    console.log(`   Email: ${admin.email}`);
    console.log(`   Rol: ${admin.role.name}`);
  } catch (error) {
    console.error("❌ Error creando usuario admin:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
