const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const tables = await prisma.$queryRawUnsafe(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name",
    );
    console.log(
      "TABLES:",
      tables.map((row) => row.table_name),
    );

    const roles = await prisma.role.findMany();
    console.log(
      "ROLES:",
      roles.map((role) => ({ id: role.id, name: role.name })),
    );

    const admin = await prisma.user.findUnique({
      where: { email: "admin@gpc.com" },
      include: { role: true },
    });
    console.log(
      "ADMIN:",
      admin ? { email: admin.email, role: admin.role.name } : "NOT FOUND",
    );
  } catch (error) {
    console.error("ERROR:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
