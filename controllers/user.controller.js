const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// register
const register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;


    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({ message: 'Faltan campos' });
    }
    const user = userModel.registerUser({ email, firstName, lastName, password });
    if (!user) return res.status(409).json({ message: 'Usuario ya existe' });

    res.status(201).json({ message: 'Usuario registrado', user });
}

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Faltan campos' });

    const user = userModel.loginUser({ email, password });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
};

module.exports = { register, login };