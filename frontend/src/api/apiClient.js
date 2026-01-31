/**
 * Cliente de API centralizado
 * Configuración base de axios para todas las peticiones HTTP
 * 
 * IMPORTANTE: Requiere variable de entorno REACT_APP_API_URL
 * Ejemplos:
 * - Desarrollo: http://localhost:8080
 * - Producción: https://mi-backend-azure.azurewebsites.net
 */

import axios from 'axios';

// Obtener URL base de la API desde variables de entorno
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

console.log('[API Client] Usando API URL:', API_URL);

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Deshabilitado
});

// Interceptor para requests (añadir autenticación, validar, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Ejemplo: Agregar token de autenticación si existe
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    // Log de request en desarrollo
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.log('[API Request]', config.method.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses (manejo de errores global)
apiClient.interceptors.response.use(
  (response) => {
    // Log de response exitosa en desarrollo
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.log('[API Response] Status:', response.status, 'URL:', response.config.url);
    }
    return response;
  },
  (error) => {
    // Manejo centralizado de errores
    if (error.response) {
      // El servidor respondió con un código de error (4xx, 5xx)
      console.error('[API Error Response]', {
        status: error.response.status,
        url: error.config?.url,
        message: error.response.data?.message || error.message,
      });

      // Manejar errores específicos
      if (error.response.status === 401) {
        // No autorizado - redirigir a login
        // window.location.href = '/login';
      } else if (error.response.status === 403) {
        // Acceso prohibido
        console.warn('Acceso prohibido a este recurso');
      } else if (error.response.status === 404) {
        // Recurso no encontrado
        console.warn('Recurso no encontrado');
      } else if (error.response.status >= 500) {
        // Error del servidor
        console.error('Error del servidor. Intenta más tarde.');
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta del servidor
      console.error('[API Error - No Response]', {
        url: error.config?.url,
        message: 'No hubo respuesta del servidor. Verifica la conexión.',
      });
    } else {
      // Algo más causó el error (configuración de request, etc.)
      console.error('[API Error]', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;


