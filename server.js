const express = require('express');
const User = require('./models/user')

const app = express();
const PORT = 4000;


// middleware to parse JSON bodies
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');
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





