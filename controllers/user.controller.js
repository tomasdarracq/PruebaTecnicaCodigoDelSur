const userModel = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

//JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

//encrypt password
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// register user, recieves in the req email, firstName, lastName and password
const register = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    //check if a field is missing
    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({ message: 'Missing Fields' });
    }
    // check that the email includes @ and the password is shorter than 20
    if (!email.includes("@") || password.length > 20) {
        return res.status(400).json({ message: 'Invalid password or email' });
    }
    //encrypt the password 
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // send the user data with the encrypted password to userModel.registerUser
    const user = userModel.registerUser({
        id: uuidv4(), //id
        email,
        firstName,
        lastName,
        password: hashedPassword
    });
    if (!user) return res.status(409).json({ message: 'User already exists' });

    res.status(201).json({ message: 'User registered' });
}
// login a user,recieves in the req the email and password
const login = async (req, res) => {
    const { email, password } = req.body;
    //check if a field is missing
    if (!email || !password)
        return res.status(400).json({ message: 'Missing Fields' });
    // send the user data to userModel.loginUser
    const user = userModel.loginUser({ email });
    if (!user) return res.status(401).json({ message: 'Invalid Credentials' });

    // compare the password stored in the json db with the one the user send
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(401).json({ message: 'Invalid Credentials' });

    // create token for the user, that contains the user email
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    //if login succeded, send token
    res.status(200).json({ token });
};

module.exports = { register, login };