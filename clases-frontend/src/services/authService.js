import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth'; 

// Iniciar sesión
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  const { user, token } = response.data;

  // Guardar en localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return { user, token };
};

// Obtener usuario actual desde localStorage
export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

// Cerrar sesión (solo borra datos del cliente)
export const logout = () => { 
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Obtener token (opcional si lo necesitas en otros servicios)
export const getToken = () => {
  return localStorage.getItem('token');
};
