const jwt = require('jsonwebtoken');
require('dotenv').config();
// middleware, checks if has token
function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'There is no token' });
    }
    // get token from header
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //user from token
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid or expired' });
    }
}

module.exports = authenticateToken;
