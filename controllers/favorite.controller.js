const favoriteModel = require('../models/favorite.model');
//getFavorites of user
const getFavorites = (req, res) => {
    const email = req.user.email;
    //call function favoriteModel.getFavoritesByEmail(email)
    const favoritesList = favoriteModel.getFavoritesByEmail(email);

    const favoriteMovies = favoritesList.map(fav => ({
        ...fav.movie,
        //add random suggestionForTodayScore
        suggestionForTodayScore: Math.floor(Math.random() * 100)
    }));
    //sort by suggestionForTodayScore
    favoriteMovies.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);
    res.json(favoriteMovies);
};
//add favorite movie, recieves from req email and movie
const addFavorite = (req, res) => {
    const email = req.user.email; // from token
    const movie = req.body;

    const favorite = {
        email,
        movie,
        //add date
        addedAt: new Date().toISOString()
    };

    favoriteModel.addFavorite(favorite);
    res.status(201).json({ message: 'Movie added to favorites' });
};

module.exports = { getFavorites, addFavorite };
