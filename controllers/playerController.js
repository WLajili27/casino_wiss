
const Player = require('../models/player');
const Game = require('../models/game');

exports.createPlayer = async (req, res) => {
    try {
        const newPlayer = await Player.create(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate('games');
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlayer = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id).populate('games');
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePlayer = async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(204).json({ message: 'Player deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// thuis method is for a player to join a game
exports.joinGame = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        const game = await Game.findById(req.params.gameId);
        if (!player || !game) {
            return res.status(404).json({ message: 'player or game not found' });
        }
        player.games.push(game);
        await player.save();
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Player leaving the game
exports.leaveGame = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        player.games = player.games.filter(gameId => gameId.toString() !== req.params.gameId);
        await player.save();
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
