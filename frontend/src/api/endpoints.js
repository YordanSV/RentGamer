/**
 * Constantes de endpoints de la API
 * Centraliza todas las URLs de endpoints para facilitar el mantenimiento
 * 
 * IMPORTANTE: Todos los endpoints asumen la baseURL configurada en apiClient.js
 * que se obtiene de REACT_APP_API_URL en variables de entorno
 */

export const API_ENDPOINTS = {
  // Endpoints de Juegos
  GAMES: {
    BASE: '/api/games',
    ALL: '/api/games',
    BY_ID: (id) => `/api/games/${id}`,
    BY_CATEGORY: (category) => `/api/games/category/${category}`,
    SEARCH: (query) => `/api/games/search?q=${query}`,
  },

  // Endpoints de Usuarios
  USERS: {
    BASE: '/api/users',
    REGISTER: '/api/users/register',
    LOGIN: '/api/users/login',
    PROFILE: '/api/users/profile',
    BY_ID: (id) => `/api/users/${id}`,
    UPDATE: (id) => `/api/users/${id}`,
  },

  // Endpoints de Suscripciones
  SUBSCRIPTIONS: {
    BASE: '/api/subscriptions',
    ALL: '/api/subscriptions',
    BY_USER: (userId) => `/api/subscriptions/user/${userId}`,
    BY_ID: (id) => `/api/subscriptions/${id}`,
  },

  // Endpoints de Alquileres
  RENTALS: {
    BASE: '/api/rentals',
    ALL: '/api/rentals',
    BY_USER: (userId) => `/api/rentals/user/${userId}`,
    BY_ID: (id) => `/api/rentals/${id}`,
  },

  // Endpoints de Carrito
  CART: {
    BASE: '/api/cart',
    GET_CART: '/api/cart',
    ADD_ITEM: '/api/cart/items',
    REMOVE_ITEM: (itemId) => `/api/cart/items/${itemId}`,
    UPDATE_ITEM: (itemId) => `/api/cart/items/${itemId}`,
    CLEAR: '/api/cart/clear',
  },

  // Endpoints de Reseñas
  REVIEWS: {
    BASE: '/api/reviews',
    ALL: '/api/reviews',
    BY_GAME: (gameId) => `/api/reviews/game/${gameId}`,
    BY_USER: (userId) => `/api/reviews/user/${userId}`,
    BY_ID: (id) => `/api/reviews/${id}`,
  },

  // Endpoint de salud (health check)
  HEALTH: '/health',
};

export default API_ENDPOINTS;


