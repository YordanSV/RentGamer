/**
 * Controladores para las rutas de juegos
 * Ahora usan la capa de servicios para la lógica de negocio
 */

const gameService = require('../services/gameService');

const gameController = {
  getAllGames: async (req, res, next) => {
    try {
      const result = await gameService.getAllGames();
      res.json(result);
    } catch (err) {
      next(err); // Pasar el error al middleware de manejo de errores
    }
  },

  getGameById: async (req, res, next) => {
    try {
      const result = await gameService.getGameById(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  createGame: async (req, res, next) => {
    try {
      const result = await gameService.createGame(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  updateGame: async (req, res, next) => {
    try {
      const result = await gameService.updateGame(req.params.id, req.body);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  deleteGame: async (req, res, next) => {
    try {
      const result = await gameService.deleteGame(req.params.id);
      if (!result.success) {
        return res.status(404).json(result);
      }
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = gameController;


