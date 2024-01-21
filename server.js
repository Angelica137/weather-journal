// Set up empty JS object to act as endpoint for all routes
let projectData = {};

// OpenWeatherMap API credentials - instructions said to put in
// app.js but I ignored that
const baseURL =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";
const apiKey = "1809b88eb7c360b423179d84b54efd810";

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middlewear */
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialise the main project folder
app.use(express.static("website"));

// GET route to return projectData object
app.get("/data", (req, res) => {
  res.send(projectData);
});

// POST route that adds incoming data to projectData
app.post("addData", (req, res) => {
  projectData = req.body;
  res.send({ message: "Data received", projectData });
});

// Setup Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
