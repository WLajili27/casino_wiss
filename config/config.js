
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  db: {
    uri: process.env.MONGODB_URI 
  },
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000
};