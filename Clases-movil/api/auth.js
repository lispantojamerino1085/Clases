// api/auth.js
import axios from 'axios';
import apiClient from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('https://8ea51b84-c69a-4a05-9951-eb3ce70bd34f-00-1s5ldoh4i9bkk.janeway.replit.dev/api/auth/login', { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post('https://8ea51b84-c69a-4a05-9951-eb3ce70bd34f-00-1s5ldoh4i9bkk.janeway.replit.dev/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const logout = async () => {
  const token = await AsyncStorage.getItem('token');
  return await axios.post(`https://8ea51b84-c69a-4a05-9951-eb3ce70bd34f-00-1s5ldoh4i9bkk.janeway.replit.dev/api/auth/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem('token');
  return !!token;
};