const express = require("express");
const axios = require("axios");
const scraper_api_endpoint = "http://127.0.0.1:5000/";
const User = require('./models/user');
const path = require('path');
const session = require('express-session');


const app = express();
const PORT = 4000;
app.use(express.static("public"));


// middleware to parse bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

// Authentication middleware
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};



app.get("/", (req, res) => {
  //   res.send("<h1>Hello World!</h1><a href='/movies'>See popular movies</a>");
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/register', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'register.html'))
});

app.get('/login', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'login.html'))
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'public', 'profile.html'))
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'An error occurred while logging out' });
    }
    res.redirect('/login');
  });
});



app.post('/register', async (req, res) => {
    try {
        const { username, password} = req.body;

        const newUser = await User.create({ username, password });

        res.redirect('/login');
        
        
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred while registering user' });
    }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Attempting login with username:', username);

  // find user by username in database
  const user = await User.findOne({where: { username } });
  
  if (!user) {
    console.log('User not found for username:', username);
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  console.log('User found:', user.toJSON());

  if (!user.validPassword(password)) {
    console.log('Invalid password for user:', username);
    return res.status(401).json({ message: 'Invalid username or password' });
  };

  req.session.userId = user.id;

  console.log('Login successful for user:', username);
  // Redirect to profile page
  res.redirect('/profile');
  
});

app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get(scraper_api_endpoint);
    let htmlResponse = "<!DOCTYPE html><html lang='en'><head><title>User Info</title></head><body>";
    htmlResponse += "<h1>Popular Movies</h1>";

    for (const key in response.data) {
        htmlResponse += `<p>${key}: ${JSON.stringify(response.data[key])}</p>`;
    }

    htmlResponse += "</body></html>";
    res.send(htmlResponse);
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    res.status(500).send("Failed to fetch data");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
