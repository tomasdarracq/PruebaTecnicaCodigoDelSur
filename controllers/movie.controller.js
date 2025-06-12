const movieModel = require('../models/movie.model');

// getMovies
const getMovies = async (req, res) => {

    const keyword = req.query.keyword || '';
    // call function movieModel.fetchMovies
    const moviesList = await movieModel.fetchMoviesByKeyword(keyword);
    const movies = moviesList.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        //add suggestionScore
        suggestionScore: Math.floor(Math.random() * 100)
    }));
    //sort movies by suggestionScore
    movies.sort((a, b) => b.suggestionScore - a.suggestionScore);
    res.json(movies);

}
module.exports = { getMovies };