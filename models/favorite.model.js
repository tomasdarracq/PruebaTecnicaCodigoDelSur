const fs = require('fs');
const path = 'favorites.json';

const getAllFavorites = () => {
    try {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const saveFavorites = (favorites) => {
    fs.writeFileSync(path, JSON.stringify(favorites, null, 2), 'utf-8');
};

const getFavoritesByEmail = (email) => {
    const all = getAllFavorites();
    return all.filter(fav => fav.email === email);
};

const addFavorite = (favorite) => {
    const favorites = getAllFavorites();
    favorites.push(favorite);
    saveFavorites(favorites);
};

module.exports = { addFavorite, getFavoritesByEmail };
