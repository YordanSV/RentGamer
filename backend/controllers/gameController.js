const Game = require('../models/Game');

const gameController = {
  getAllGames: async (req, res) => {
    try {
      const games = await Game.getAll();
      res.json(games);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getGameById: async (req, res) => {
    try {
      const game = await Game.getById(req.params.id);
      if (game) res.json(game);
      else res.status(404).json({ message: 'Game not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createGame: async (req, res) => {
    try {
      const newGame = await Game.create(req.body);
      res.status(201).json(newGame);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateGame: async (req, res) => {
    try {
      const updatedGame = await Game.update(req.params.id, req.body);
      if (updatedGame.affectedRows > 0) res.json({ message: 'Game updated successfully' });
      else res.status(404).json({ message: 'Game not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteGame: async (req, res) => {
    try {
      const result = await Game.delete(req.params.id);
      if (result.affectedRows > 0) res.json({ message: 'Game deleted successfully' });
      else res.status(404).json({ message: 'Game not found' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = gameController;
