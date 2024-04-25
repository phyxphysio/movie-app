const express = require('express');
const User = require('./models/user')

const app = express();
const PORT = 4000;



async function createUser(username, password) {
    try {
        const newUser = await User.create({ username, password});
        console.log('User created:', newUser);
    } catch (err) {
        console.error('Error creating user:', err);
    }
}

createUser('test', 'test123');


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





