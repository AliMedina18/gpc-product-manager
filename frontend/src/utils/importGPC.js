// utils/importGPC.js
// Función para importar datos GPC desde GPCData.json al localStorage

const STORAGE_KEYS = {
  segments: "gpcSegments",
  families: "gpcFamilies",
  classes: "gpcClasses",
  bricks: "gpcBricks",
  attributes: "gpcAttributes",
};

const processGPCData = (data) => {
  const segments = [];
  const families = [];
  const classes = [];
  const bricks = [];
  const attributes = [];

  const processItem = (item, parentId = null, level = 1) => {
    const { Code, Title, Childs = [] } = item;

    switch (level) {
      case 1: // Segment
        segments.push({ id: Code, nombre: Title });
        Childs.forEach((child) => processItem(child, Code, 2));
        break;
      case 2: // Family
        families.push({ id: Code, nombre: Title, segmentId: parentId });
        Childs.forEach((child) => processItem(child, Code, 3));
        break;
      case 3: // Class
        classes.push({ id: Code, nombre: Title, familyId: parentId });
        Childs.forEach((child) => processItem(child, Code, 4));
        break;
      case 4: // Brick
        bricks.push({ id: Code, nombre: Title, classId: parentId });
        Childs.forEach((child) => processItem(child, Code, 5));
        break;
      case 5: // Attributes
        attributes.push({ id: Code, nombre: Title, brickId: parentId });
        break;
    }
  };

  if (data.Schema && Array.isArray(data.Schema)) {
    data.Schema.forEach((segment) => processItem(segment, null, 1));
  }

  return { segments, families, classes, bricks, attributes };
};

export const importGPCData = async () => {
  try {
    // Asumiendo que GPCData.json está en /GPCData.json (servido desde public)
    const response = await fetch("/GPCData.json");
    if (!response.ok) {
      throw new Error("Error cargando GPCData.json");
    }
    const data = await response.json();

    const processed = processGPCData(data);

    // Almacenar en localStorage
    localStorage.setItem(
      STORAGE_KEYS.segments,
      JSON.stringify(processed.segments),
    );
    localStorage.setItem(
      STORAGE_KEYS.families,
      JSON.stringify(processed.families),
    );
    localStorage.setItem(
      STORAGE_KEYS.classes,
      JSON.stringify(processed.classes),
    );
    localStorage.setItem(STORAGE_KEYS.bricks, JSON.stringify(processed.bricks));
    localStorage.setItem(
      STORAGE_KEYS.attributes,
      JSON.stringify(processed.attributes),
    );

    console.log("Datos GPC importados exitosamente al localStorage");
    return true;
  } catch (error) {
    console.error("Error importando datos GPC:", error);
    return false;
  }
};

export const getGPCData = (type) => {
  const key = STORAGE_KEYS[type];
  if (!key) return [];

  const raw = localStorage.getItem(key);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error leyendo ${type} desde localStorage:`, error);
    return [];
  }
};

export const clearGPCData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
