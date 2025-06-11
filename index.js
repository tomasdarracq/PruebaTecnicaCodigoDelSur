const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/users.routes');
const moviesRoutes = require('./routes/movies.routes');
const favoritesRoutes = require('./routes/favorites.routes');


app.use('/api/users', userRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/favorites', favoritesRoutes);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});




