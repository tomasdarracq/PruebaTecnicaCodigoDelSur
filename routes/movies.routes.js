// routes/movies.routes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authenticateToken = require('../middleware/auth.middleware');

//route for getMovies
router.get('/', authenticateToken, movieController.getMovies);

module.exports = router;
