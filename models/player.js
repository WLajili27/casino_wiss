const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Sir name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  bornDate: {
    type: Date,
    required: [true, 'date of birth is required']
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// method to return games per player
playerSchema.methods.listGamesPerPlayer = async function(page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  return Game.find({ _id: { $in: this.games } })
    .skip(skip)
    .limit(limit)
    .exec(); // Execute the query
};


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
