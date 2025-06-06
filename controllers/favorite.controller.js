const favoriteModel = require('../models/favorite.model');

const getFavorites = (req, res) => {
    const email = req.user.email;
    const favoritesList = favoriteModel.getFavoritesByEmail(email);

    const favoriteMovies = favoritesList.map(fav => ({
        ...fav.movie,
        suggestionForTodayScore: Math.floor(Math.random() * 100)
    }));

    favoriteMovies.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);
    res.json(favoriteMovies);
};

const addFavorite = (req, res) => {
    const email = req.user.email;
    const movie = req.body;

    const favorite = {
        email,
        movie,
        addedAt: new Date().toISOString()
    };

    favoriteModel.addFavorite(favorite);
    res.status(201).json({ message: 'Película agregada a favoritos' });
};

module.exports = { getFavorites, addFavorite };
