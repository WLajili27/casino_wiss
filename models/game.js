const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  images: [{
    type: String
  }]
});

//update the 'updatedAt' on save 
gameSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// create the game model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
