const express = require('express');
const User = require('./models/user')

const app = express();
const PORT = 4000;


// middleware to parse bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware to serve static files from the 'public' directory
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});




app.post('/register', async (req, res) => {
    try {
        const { username, password} = req.body;

        const newUser = await User.create({ username, password });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred while registering user' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





