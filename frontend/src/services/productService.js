import apiClient from "./apiClient";

export const productService = {
  getAll: () => apiClient.get("/api/products"),

  getById: (id) => apiClient.get(`/api/products/${id}`),

  create: (product) => apiClient.post("/api/products", product),

  update: (id, product) => apiClient.put(`/api/products/${id}`, product),

  delete: (id) => apiClient.delete(`/api/products/${id}`),
};
