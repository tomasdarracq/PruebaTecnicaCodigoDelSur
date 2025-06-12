const favoriteModel = require('../models/favorite.model');
const movieModel = require('../models/movie.model');
const { v4: uuidv4 } = require('uuid');
//getFavorites of user
const getFavorites = (req, res) => {
    const email = req.user.email;
    //call function favoriteModel.getFavoritesByEmail(email)
    const favoritesList = favoriteModel.getFavoritesByEmail(email);

    const favoriteMovies = favoritesList.map(fav => ({
        ...fav,
        //add random suggestionForTodayScore
        suggestionForTodayScore: Math.floor(Math.random() * 100)
    }));
    //sort by suggestionForTodayScore
    favoriteMovies.sort((a, b) => b.suggestionForTodayScore - a.suggestionForTodayScore);
    res.json(favoriteMovies);
};

//add favorite movie, recieves from req email and movie
const addFavorite = async (req, res) => {
    const email = req.user.email; // from token
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ error: 'missing movieId' });
    }

    const movie = await movieModel.fetchMovieById(movieId);

    const favorite = {
        id: uuidv4(),
        email,
        movieId: movie.id,
        movieName: movie.title,
        addedAt: new Date().toISOString()
    };


    const result = favoriteModel.addFavorite(favorite);

    if (!result.success) {
        return res.status(409).json({ message: result.message });
    }

    res.status(201).json({ message: 'Favorite added', favorite });
};



module.exports = { getFavorites, addFavorite };
