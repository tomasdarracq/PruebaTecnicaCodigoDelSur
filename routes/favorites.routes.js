// routes/favorite.routes.js
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const authenticateToken = require('../middleware/auth.middleware');
//route for getFavorites
router.get('/', authenticateToken, favoriteController.getFavorites);
//route for addFavorite
router.post('/', authenticateToken, favoriteController.addFavorite);

module.exports = router;
