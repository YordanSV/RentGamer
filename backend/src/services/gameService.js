/**
 * Capa de servicios para la lógica de negocio de juegos
 * Separa la lógica de negocio de los controladores
 */


const Game = require('../models/Game');
const axios = require('axios');
const GAMES_API_URL = process.env.GAMES_API_URL || 'http://localhost:5000/api/games';
console.log('GAMES_API_URL:', GAMES_API_URL);

const gameService = {
  /**
   * Obtener todos los juegos
   */
  getAllGames: async () => {
    try {
      const response = await axios.get(GAMES_API_URL);
      // Log para comprobar que los datos vienen del microservicio
      console.log('[MICROSERVICIO] URL consultada:', GAMES_API_URL);
      if (Array.isArray(response.data)) {
        console.log('[MICROSERVICIO] Primeros juegos recibidos:', response.data.slice(0, 2));
      } else {
        console.log('[MICROSERVICIO] Respuesta recibida:', response.data);
      }
      // Mapeo de categorías
      const categoryMap = {
        1: 'Acción',
        2: 'Aventura',
        3: 'Estrategia',
        // Agrega más si tienes más categorías
      };
      // Agregar category_name a cada juego
      const gamesWithCategory = Array.isArray(response.data)
        ? response.data.map(game => ({
            ...game,
            category_name: categoryMap[game.categoryId] || 'Sin categoría'
          }))
        : response.data;
      return {
        success: true,
        data: gamesWithCategory,
      };
    } catch (error) {
      throw new Error(`Error al obtener juegos: ${error.message}`);
    }
  },

  /**
   * Obtener un juego por ID
   */
  getGameById: async (id) => {
    try {
      const response = await axios.get(`${GAMES_API_URL}/${id}`);
      if (!response.data) {
        return {
          success: false,
          message: 'Juego no encontrado',
        };
      }
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      throw new Error(`Error al obtener el juego: ${error.message}`);
    }
  },

  /**
   * Crear un nuevo juego
   */
  createGame: async (gameData) => {
    try {
      const response = await axios.post(GAMES_API_URL, gameData);
      return {
        success: true,
        data: response.data,
        message: 'Juego creado exitosamente',
      };
    } catch (error) {
      throw new Error(`Error al crear el juego: ${error.message}`);
    }
  },

  /**
   * Actualizar un juego existente
   */
  updateGame: async (id, gameData) => {
    try {
      const response = await axios.put(`${GAMES_API_URL}/${id}`, gameData);
      if (!response.data) {
        return {
          success: false,
          message: 'Juego no encontrado',
        };
      }
      return {
        success: true,
        data: response.data,
        message: 'Juego actualizado exitosamente',
      };
    } catch (error) {
      throw new Error(`Error al actualizar el juego: ${error.message}`);
    }
  },

  /**
   * Eliminar un juego
   */
  deleteGame: async (id) => {
    try {
      const response = await axios.delete(`${GAMES_API_URL}/${id}`);
      if (!response.data) {
        return {
          success: false,
          message: 'Juego no encontrado',
        };
      }
      return {
        success: true,
        data: response.data,
        message: 'Juego eliminado exitosamente',
      };
    } catch (error) {
      throw new Error(`Error al eliminar el juego: ${error.message}`);
    }
  },

}

module.exports = gameService;