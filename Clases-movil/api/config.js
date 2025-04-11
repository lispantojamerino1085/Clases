// api/config.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cambia esta URL por la de tu API
const API_URL = 'https://75480798-91c1-432b-9b5d-3f18817da455-00-3hmkh4ovpru6z.spock.replit.dev/api';

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

export default apiClient;