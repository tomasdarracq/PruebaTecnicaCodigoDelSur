const { fetchMovies } = require('../models/movie.model');
const movieModel = require('../models/movie.model');


const getMovies = async (req, res) => {

    const keyword = req.query.keyword || '';
    const moviesList = await fetchMovies(keyword);
    const movies = moviesList.results.map(movie => ({
        ...movie,
        suggestionScore: Math.floor(Math.random() * 100)
    }));
    movies.sort((a, b) => b.suggestionScore - a.suggestionScore);
    res.json(movies);

}
module.exports = { getMovies };