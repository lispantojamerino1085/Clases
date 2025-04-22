// api/departamentos.js
import apiClient from './config';

export const getAllDepartamentos = async () => {
  try {
    const response = await apiClient.get('https://5c36d0e5-e9b6-4bb0-888f-e57d6f571338-00-2i7rz9xf7vcjb.picard.replit.dev/api/departamentos');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error; 
  }
};

export const getDepartamento = async (id) => {
  try {
    const response = await apiClient.get(`https://5c36d0e5-e9b6-4bb0-888f-e57d6f571338-00-2i7rz9xf7vcjb.picard.replit.dev/api/departamentos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createDepartamento = async (data) => {
  try {
    const response = await apiClient.post('https://5c36d0e5-e9b6-4bb0-888f-e57d6f571338-00-2i7rz9xf7vcjb.picard.replit.dev/api/departamentos', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateDepartamento = async (id, data) => {
  try {
    const response = await apiClient.put(`https://5c36d0e5-e9b6-4bb0-888f-e57d6f571338-00-2i7rz9xf7vcjb.picard.replit.dev/api/departamentos/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteDepartamento = async (id) => {
  try {
    const response = await apiClient.delete(`https://5c36d0e5-e9b6-4bb0-888f-e57d6f571338-00-2i7rz9xf7vcjb.picard.replit.dev/api/departamentos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};