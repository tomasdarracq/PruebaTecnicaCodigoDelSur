const fs = require('node:fs');
const path = 'users.json';
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

    if (users.find(u => u.email === user.email)) return null;
    users.push(user);
    saveUser(users);
    return user;
}
//save  user in txt
const saveUser = (users) => {
    fs.writeFileSync(path, JSON.stringify(users, null, 2), 'utf-8');
}

//login user
const loginUser = ({ email, password }) => {
    const users = getUsers();
    return users.find(u => u.email === email && u.password === password);
};
module.exports = { getUsers, registerUser, saveUser, loginUser };