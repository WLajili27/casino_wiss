const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// add a new player
router.post('/', playerController.createPlayer);

// Retrieve all players  //todo : pagination !!! don't forget !!!!
router.get('/', playerController.getAllPlayers);

// Get a player by ID
router.get('/:id', playerController.getPlayer);

// Update player 
router.put('/:id', playerController.updatePlayer);

// Deleete  player
router.delete('/:id', playerController.deletePlayer);

// routes for interactions with games
router.put('/:id/join/:gameId', playerController.joinGame);  // join game
router.put('/:id/leave/:gameId', playerController.leaveGame); // leave game

router.get('/players/:playerId/games', playerController.getGamesByPlayer); // list games for player


module.exports = router;
