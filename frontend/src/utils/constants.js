/**
 * Constantes de la aplicación
 * Centraliza valores que se usan en múltiples lugares
 */

export const APP_CONFIG = {
  NAME: 'RentGamer',
  VERSION: '1.0.0',
};

export const GAME_CATEGORIES = {
  ACTION: 'action',
  ADVENTURE: 'adventure',
  STRATEGY: 'strategy',
  // Agregar más categorías según sea necesario
};

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  SUBSCRIPTION: '/subscription',
  REGISTER: '/register',
  GAME_DETAIL: (id) => `/shop/game/${id}`,
};

export default {
  APP_CONFIG,
  GAME_CATEGORIES,
  ROUTES,
};


