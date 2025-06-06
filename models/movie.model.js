require('dotenv').config();

async function fetchMovies(keyword = '') {
    let url = '';
    if (keyword.trim() === '') {
        // Traer películas populares
        url = 'https://api.themoviedb.org/3/movie/popular?page=1&language=es';
    } else {
        // Buscar por keyword
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
    if (!res.ok) throw new Error('Fallo al contactar con TMDb');

    return await res.json();
}

module.exports = { fetchMovies };
