import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const token = localStorage.getItem('token');
    if (currentUser && token) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { token, user } = response.data;
      authService.setToken(token, user);
      setUser(user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await authService.register(email, password);
      const { token, user } = response.data;
      authService.setToken(token, user);
      setUser(user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
