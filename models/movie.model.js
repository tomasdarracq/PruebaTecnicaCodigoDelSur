require('dotenv').config();

// fetch movies from themoviedb
async function fetchMoviesByKeyword(keyword = '') {
    let url = '';
    if (keyword.trim() === '') {
        // if no keyword bring most popular movies
        url = 'https://api.themoviedb.org/3/movie/popular?page=1&language=es';
    } else {
        // search by keyword
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}&page=1&language=es`;
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    };

    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Failed at connecting to themoviedb');

    return await res.json();
}
async function fetchMovieById(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=es`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    };

    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Movie not founded');
    return await res.json();
}


module.exports = { fetchMoviesByKeyword, fetchMovieById };
