const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { validateGame, validateGameId } = require('../validators/gameValidator');

// Aplicar validación de ID
router.param('id', validateGameId);

// Rutas
router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);
router.post('/', validateGame, gameController.createGame);
router.put('/:id', validateGame, gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;


