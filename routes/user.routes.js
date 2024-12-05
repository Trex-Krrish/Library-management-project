const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userAuth = require('../middleware/userAuth');
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userAuth, userController.getUserProfile);

module.exports = router;