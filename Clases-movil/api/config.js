// api/config.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../helpers/RootNavigation'; // asegúrate de tener esto (lo explico abajo)

// Cambia esta URL por la de tu API
const API_URL = 'https://8ea51b84-c69a-4a05-9951-eb3ce70bd34f-00-1s5ldoh4i9bkk.janeway.replit.dev/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para añadir token de autenticación
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      RootNavigation.navigate('Login'); // Redirige automáticamente
    }
    return Promise.reject(error);
  }
);

export default apiClient;