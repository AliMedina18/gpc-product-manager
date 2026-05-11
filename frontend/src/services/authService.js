// Simulación de login local para despliegue sin backend
export const authService = {
  register: (email, password) => {
    // Simula registro exitoso, pero no guarda nada
    return Promise.resolve({ data: { email } });
  },

  login: (email, password) => {
    // Solo permite el usuario admin@gpc.com / admin123
    if (email === "admin@gpc.com" && password === "admin123") {
      const user = { email, role: "ADMIN" };
      const token = "fake-token";
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return Promise.resolve({ data: { token, user } });
    } else {
      return Promise.reject({ error: "Credenciales inválidas" });
    }
  },

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
