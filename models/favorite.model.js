const fs = require('fs');
const path = 'db/favorites.json';

//get all favorites from favorites.json
const getAllFavorites = () => {
    try {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

//save favorites in favorites.json
const saveFavorites = (favorites) => {
    fs.writeFileSync(path, JSON.stringify(favorites, null, 2), 'utf-8');
};
// from all favorites get the ones with matching email
const getFavoritesByEmail = (email) => {
    const all = getAllFavorites();
    return all.filter(fav => fav.email === email);
};

// add favorite to favorites.json
const addFavorite = (favorite) => {
    const favorites = getAllFavorites();
    favorites.push(favorite);
    saveFavorites(favorites);
};

module.exports = { addFavorite, getFavoritesByEmail };
