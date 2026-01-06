/**
 * Constantes de endpoints de la API
 * Centraliza todas las URLs de endpoints para facilitar el mantenimiento
 */

export const API_ENDPOINTS = {
  GAMES: {
    BASE: '/api/games',
    ALL: '/api/games',
    BY_ID: (id) => `/api/games/${id}`,
  },
  HEALTH: '/health',
  // Agregar más endpoints aquí cuando sea necesario
};

export default API_ENDPOINTS;


