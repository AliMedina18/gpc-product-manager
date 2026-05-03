import apiClient from "./apiClient";

export const authService = {
  register: (email, password) =>
    apiClient.post("/api/auth/register", { email, password }),

  login: (email, password) =>
    apiClient.post("/api/auth/login", { email, password }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setToken: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },
};
