/**
 * Cliente de API centralizado
 * Configuración base de axios para todas las peticiones HTTP
 */

import axios from 'axios';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://my-backend.railway.app',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests (añadir token, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Aquí puedes añadir tokens de autenticación si es necesario
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses (manejo de errores global)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo centralizado de errores
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('Error de red:', error.request);
    } else {
      // Algo más causó el error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;


