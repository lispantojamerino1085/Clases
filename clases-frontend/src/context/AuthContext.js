import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser, logout as clearAuthData } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // Verificar usuario autenticado al cargar
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false); 
  }, []);

  // Función para cerrar sesión
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:8000/api/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Limpiar datos
      clearAuthData(); // 👈 esto borra token, name y user
      setCurrentUser(null);
      
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
