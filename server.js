const express = require("express");
const axios = require("axios");
const scraper_api_endpoint = "http://127.0.0.1:5000/";

const app = express();
const PORT = 4000;
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //   res.send("<h1>Hello World!</h1><a href='/movies'>See popular movies</a>");
  res.sendFile("index.html");
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
