require("dotenv").config({ path: "./backend/.env" });
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function verify() {
  try {
    const counts = {
      segments: await prisma.segment.count(),
      families: await prisma.family.count(),
      classes: await prisma.class.count(),
      bricks: await prisma.brick.count(),
      attributes: await prisma.attribute.count(),
    };

    console.log("✅ DATOS CONFIRMADOS EN LA BASE DE DATOS:");
    console.log("  Segments:", counts.segments);
    console.log("  Families:", counts.families);
    console.log("  Classes:", counts.classes);
    console.log("  Bricks:", counts.bricks);
    console.log("  Attributes:", counts.attributes);
    console.log(
      "\n📊 Total de registros GPC importados:",
      counts.segments +
        counts.families +
        counts.classes +
        counts.bricks +
        counts.attributes,
    );
  } finally {
    await prisma.$disconnect();
  }
}

verify();
