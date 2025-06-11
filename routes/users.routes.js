const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

//route for register user
router.post('/register', userController.register);

//route for login user
router.post('/login', userController.login);


module.exports = router;