const fs = require('node:fs');
const path = 'db/users.json'; //path to json

//get all users
const getUsers = () => {
    try {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
};

// register user
const registerUser = (user) => {
    const users = getUsers();
    //check if user already exists
    if (users.find(u => u.email === user.email)) return null;
    users.push(user);
    saveUser(users);
    return user;
}
//save  user in json
const saveUser = (users) => {
    //write in the JSON all the users
    fs.writeFileSync(path, JSON.stringify(users, null, 2), 'utf-8');
}

//login user
const loginUser = ({ email }) => {
    const users = getUsers();
    return users.find(u => u.email === email);
};
module.exports = { getUsers, registerUser, saveUser, loginUser };