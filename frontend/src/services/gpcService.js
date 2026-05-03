import apiClient from "./apiClient";

export const gpcService = {
  getSegments: () => apiClient.get("/api/gpc/segments"),

  getFamilies: (segmentId) => apiClient.get(`/api/gpc/families/${segmentId}`),

  getClasses: (familyId) => apiClient.get(`/api/gpc/classes/${familyId}`),

  getBricks: (classId) => apiClient.get(`/api/gpc/bricks/${classId}`),

  getAttributes: (brickId) => apiClient.get(`/api/gpc/attributes/${brickId}`),
};
