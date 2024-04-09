const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Create a new game
router.post('/', gameController.createGame);

// Retrieve all games,  //todo : remember add pagination !!!
router.get('/', gameController.getAllGames);

// return game by ID
router.get('/:id', gameController.getGame);

// Update  game by ID
router.put('/:id', gameController.updateGame);

// Delete  game by ID
router.delete('/:id', gameController.deleteGame);

module.exports = router;
