const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getSegments() {
  return prisma.segment.findMany({ orderBy: { nombre: "asc" } });
}

async function getFamiliesBySegment(segmentId) {
  return prisma.family.findMany({
    where: { segmentId: Number(segmentId) },
    orderBy: { nombre: "asc" },
  });
}

async function getClassesByFamily(familyId) {
  return prisma.class.findMany({
    where: { familyId: Number(familyId) },
    orderBy: { nombre: "asc" },
  });
}

async function getBricksByClass(classId) {
  return prisma.brick.findMany({
    where: { classId: Number(classId) },
    orderBy: { nombre: "asc" },
  });
}

async function getAttributesByBrick(brickId) {
  return prisma.attribute.findMany({
    where: { brickId: Number(brickId) },
    orderBy: { nombre: "asc" },
  });
}

module.exports = {
  getSegments,
  getFamiliesBySegment,
  getClassesByFamily,
  getBricksByClass,
  getAttributesByBrick,
};
