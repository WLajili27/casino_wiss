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


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
