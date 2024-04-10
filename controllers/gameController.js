const Game = require('../models/game');

exports.createGame = async (req, res) => {
    try {
        const newGame = await Game.create(req.body);
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllGames = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const games = await Game.find().skip(skip).limit(limit);
        const total = await Game.countDocuments();

        res.status(200).json({
            total,
            pages: Math.ceil(total / limit),
            currentPage: page,
            games
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGame = async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.status(204).json({ message: 'Game deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
