const dotenv = require('dotenv');
dotenv.config();
 
module.exports = {
  db: {
    uri: process.env.MONGODB_URI
  },
  mongoTestConfig: {
    uri: process.env.MONGO_TEST_URI
  },
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000
};