const express = require("express");
const axios = require("axios");
const scraper_api_endpoint = "http://127.0.0.1:5000/";

const app = express();
const PORT = 4000;

app.get("/", async (req, res) => {
  res.send("<h1>Hello World!</h1><a href='/movies'>See popular movies</a>");
});
app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get(scraper_api_endpoint);
    res.send(response.data);
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    res.status(500).send("Failed to fetch data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
