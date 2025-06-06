const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//register user
router.post('/register', userController.register);

//login
router.get('/login', userController.login);


module.exports = router;