const express = require('express');
const usersController = require('../controllers/users');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/:id', auth, usersController.getUserById);
router.get('/', auth, usersController.getAllUsers);
router.put('/:id', auth, usersController.updateUser);
router.delete('/:id', auth, usersController.deleteUser);

module.exports = router;
