/**
 * Script de importación de datos GPC desde un archivo JSON.
 * Soporta el archivo jerárquico `GPCData.json` con raíz `Schema`
 * y el formato simple de array con campos segment/family/class/brick.
 *
 * Uso:
 *   node scripts/importGPC.js ./GPCData.json
 */

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();
const cache = {
  segments: new Map(),
  families: new Map(),
  classes: new Map(),
  bricks: new Map(),
  attributes: new Map(),
};
const created = { segments: 0, families: 0, classes: 0, bricks: 0, attributes: 0 };

async function ensureSegment(nombre) {
  if (!nombre) throw new Error("Segmento sin nombre");
  const key = nombre.trim();
  if (cache.segments.has(key)) return cache.segments.get(key);
  const existing = await prisma.segment.findUnique({ where: { nombre: key } });
  if (existing) {
    cache.segments.set(key, existing);
    return existing;
  }
  const segment = await prisma.segment.create({ data: { nombre: key } });
  cache.segments.set(key, segment);
  created.segments++;
  return segment;
}

async function ensureFamily(nombre, segmentId) {
  const clean = nombre?.trim();
  const key = `${segmentId}:${clean}`;
  if (cache.families.has(key)) return cache.families.get(key);
  const existing = await prisma.family.findFirst({ where: { nombre: clean, segmentId } });
  if (existing) {
    cache.families.set(key, existing);
    return existing;
  }
  const family = await prisma.family.create({ data: { nombre: clean, segmentId } });
  cache.families.set(key, family);
  created.families++;
  return family;
}

async function ensureClass(nombre, familyId) {
  const clean = nombre?.trim();
  const key = `${familyId}:${clean}`;
  if (cache.classes.has(key)) return cache.classes.get(key);
  const existing = await prisma.class.findFirst({ where: { nombre: clean, familyId } });
  if (existing) {
    cache.classes.set(key, existing);
    return existing;
  }
  const cls = await prisma.class.create({ data: { nombre: clean, familyId } });
  cache.classes.set(key, cls);
  created.classes++;
  return cls;
}

async function ensureBrick(nombre, classId) {
  const clean = nombre?.trim();
  const key = `${classId}:${clean}`;
  if (cache.bricks.has(key)) return cache.bricks.get(key);
  const existing = await prisma.brick.findFirst({ where: { nombre: clean, classId } });
  if (existing) {
    cache.bricks.set(key, existing);
    return existing;
  }
  const brick = await prisma.brick.create({ data: { nombre: clean, classId } });
  cache.bricks.set(key, brick);
  created.bricks++;
  return brick;
}

async function ensureAttribute(nombre, brickId) {
  if (!nombre) return null;
  const clean = nombre.trim();
  const key = `${brickId}:${clean}`;
  if (cache.attributes.has(key)) return cache.attributes.get(key);
  const existing = await prisma.attribute.findFirst({ where: { nombre: clean, brickId } });
  if (existing) {
    cache.attributes.set(key, existing);
    return existing;
  }
  const attribute = await prisma.attribute.create({ data: { nombre: clean, brickId } });
  cache.attributes.set(key, attribute);
  created.attributes++;
  return attribute;
}

async function importRecord(record) {
  const segmentName = record.segment?.trim();
  const familyName = record.family?.trim();
  const className = record.class?.trim();
  const brickName = record.brick?.trim();
  const attributeName = record.attribute?.trim();

  if (!segmentName || !familyName || !className || !brickName) return;

  const segment = await ensureSegment(segmentName);
  const family = await ensureFamily(familyName, segment.id);
  const cls = await ensureClass(className, family.id);
  const brick = await ensureBrick(brickName, cls.id);
  if (attributeName) await ensureAttribute(attributeName, brick.id);
}

async function importTree(nodes) {
  async function traverse(node, ancestors = []) {
    const path = [...ancestors, node];
    if ([1, 2, 3, 4, 5].includes(node.Level)) {
      const segmentNode = path.find((item) => item.Level === 1);
      const familyNode = path.find((item) => item.Level === 2);
      const classNode = path.find((item) => item.Level === 3);
      const brickNode = path.find((item) => item.Level === 4);
      const attributeNode = path.find((item) => item.Level === 5);

      if (segmentNode && familyNode && classNode && brickNode) {
        const segment = await ensureSegment(segmentNode.Title);
        const family = await ensureFamily(familyNode.Title, segment.id);
        const cls = await ensureClass(classNode.Title, family.id);
        const brick = await ensureBrick(brickNode.Title, cls.id);
        if (attributeNode) await ensureAttribute(attributeNode.Title, brick.id);
      }
    }

    if (Array.isArray(node.Childs)) {
      for (const child of node.Childs) {
        await traverse(child, path);
      }
    }
  }

  for (const node of nodes) {
    await traverse(node);
  }
}

async function importGPC(filePath) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Archivo no encontrado: ${fullPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(fullPath, "utf-8");
  const json = JSON.parse(raw);
  const records = Array.isArray(json) ? json : json.Schema || [];

  console.log(`📦 Importando ${Array.isArray(records) ? records.length : 0} registros GPC...`);

  if (!Array.isArray(records)) {
    throw new Error("Formato de JSON no válido para importación");
  }

  if (records.length && records[0].segment && records[0].family && records[0].class && records[0].brick) {
    for (const record of records) {
      await importRecord(record);
    }
  } else {
    await importTree(records);
  }

  console.log("✅ Importación completada:");
  console.log(`   Segments: ${created.segments} nuevos`);
  console.log(`   Families: ${created.families} nuevas`);
  console.log(`   Classes:  ${created.classes} nuevas`);
  console.log(`   Bricks:   ${created.bricks} nuevos`);
  console.log(`   Attributes: ${created.attributes} nuevos`);
}

const defaultFile = path.resolve(__dirname, "./GPCData.json");
const file = process.argv[2] ? path.resolve(process.argv[2]) : defaultFile;
importGPC(file)
  .catch((e) => {
    console.error("❌ Error:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
