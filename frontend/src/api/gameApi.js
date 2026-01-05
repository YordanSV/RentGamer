/**
 * Servicio de API para juegos
 * Centraliza todas las llamadas relacionadas con juegos
 */

import apiClient from './apiClient';
import { API_ENDPOINTS } from './endpoints';

const gameApi = {
  /**
   * Obtener todos los juegos
   */
  getAllGames: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GAMES.ALL);
      // El backend devuelve { success: true, data: [...] }
      // response.data ya contiene esto, así que lo devolvemos directamente
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Obtener un juego por ID
   */
  getGameById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.GAMES.BY_ID(id));
      // El backend devuelve { success: true, data: {...} }
      // response.data ya contiene esto, así que lo devolvemos directamente
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Crear un nuevo juego
   */
  createGame: async (gameData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.GAMES.BASE, gameData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Actualizar un juego existente
   */
  updateGame: async (id, gameData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.GAMES.BY_ID(id), gameData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  /**
   * Eliminar un juego
   */
  deleteGame: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.GAMES.BY_ID(id));
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  },
};

export default gameApi;

