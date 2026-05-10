const STORAGE_KEY = "productsData";

const loadProductsFromStorage = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error leyendo productsData desde localStorage:", error);
    return [];
  }
};

const saveProductsToStorage = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const buildResponse = (data) => ({ data });

const normalizeId = (id) => id?.toString();

export const productService = {
  getAll: async () => buildResponse(loadProductsFromStorage()),

  getById: async (id) => {
    const products = loadProductsFromStorage();
    const product = products.find(
      (item) => normalizeId(item.id) === normalizeId(id),
    );
    return buildResponse(product || null);
  },

  create: async (product) => {
    const products = loadProductsFromStorage();
    const newProduct = {
      id: Date.now().toString(),
      ...product,
    };

    saveProductsToStorage([...products, newProduct]);
    return buildResponse(newProduct);
  },

  update: async (id, product) => {
    const products = loadProductsFromStorage();
    const index = products.findIndex(
      (item) => normalizeId(item.id) === normalizeId(id),
    );
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }

    const updatedProduct = {
      ...products[index],
      ...product,
      id: products[index].id,
    };

    products[index] = updatedProduct;
    saveProductsToStorage(products);
    return buildResponse(updatedProduct);
  },

  delete: async (id) => {
    const products = loadProductsFromStorage();
    const filtered = products.filter(
      (item) => normalizeId(item.id) !== normalizeId(id),
    );
    saveProductsToStorage(filtered);
    return buildResponse(null);
  },
};
