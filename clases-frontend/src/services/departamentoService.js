import api from './api'; 
export const getDepartamentos = async () => { 
try { 
const response = await api.get('/departamentos'); 
return response.data;  
} catch (error) { 
throw error.response.data; 
} 
}; 
export const getDepartamento = async (id) => { 
try { 
const response = await api.get(`/departamentos/${id}`); 
return response.data; 
} catch (error) { 
throw error.response.data; 
} 
}; 
export const createDepartamento = async (departamentoData) => { 
try { 
const response = await api.post('/departamentos', departamentoData); 
return response.data; 
} catch (error) { 
throw error.response.data; 
} 
}; 
export const updateDepartamento = async (id, departamentoData) => { 
try { 
const response = await api.put(`/departamentos/${id}`, departamentoData); 
return response.data; 
} catch (error) { 
throw error.response.data; 
} 
}; 
export const deleteDepartamento = async (id) => { 
try { 
const response = await api.delete(`/departamentos/${id}`); 
return response.data; 
} catch (error) { 
throw error.response.data; 
} 
};