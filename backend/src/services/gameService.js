/**
 * Capa de servicios para la lógica de negocio de juegos
 * Separa la lógica de negocio de los controladores
 */

const Game = require('../models/Game');

const gameService = {
  /**
   * Obtener todos los juegos
   */
  getAllGames: async () => {
    try {
      const games = await Game.getAll();
      return {
        success: true,
        data: games,
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
      const game = await Game.getById(id);
      if (!game) {
        return {
          success: false,
          message: 'Juego no encontrado',
        };
      }
      return {
        success: true,
        data: game,
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
      const newGame = await Game.create(gameData);
      return {
        success: true,
        data: newGame,
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
      const result = await Game.update(id, gameData);
      if (!result) {
        return {
          success: false,
          message: 'Juego no encontrado',
        };
      }
      return {
        success: true,
        data: result,
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
      const result = await Game.delete(id);
      if (result.affectedRows === 0) {
        return {
          success: false,
          message: 'Juego no encontrado',
        };
      }
      return {
        success: true,
        message: 'Juego eliminado exitosamente',
      };
    } catch (error) {
      throw new Error(`Error al eliminar el juego: ${error.message}`);
    }
  },
};

module.exports = gameService;

