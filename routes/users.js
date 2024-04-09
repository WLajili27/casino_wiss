const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const gameController = require('../controllers/gameController');
const { isAdmin } = require('../middlewares/authMiddleware');


router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Admin only routes for game model, protected by isAdmin middleware
router.post('/games', isAdmin, gameController.createGame);
router.put('/games/:id', isAdmin, gameController.updateGame);
router.delete('/games/:id', isAdmin, gameController.deleteGame);

// user and admin routee for user model
router.get('/', isAdmin, userController.getAllUsers); // Only admins can view all users
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser); // same for delete only the big boys can delete stuff

module.exports = router;
