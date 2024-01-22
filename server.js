// Set up empty JS object to act as endpoint for all routes
let projectData = {};

// OpenWeatherMap API credentials - instructions said to put in
// app.js but I ignored that
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "1809b88eb7c360b423179d84b54efd81";

// Require Express to run server and routes
// const express = require("express"); - got err so replaced
// all requires with import
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

// Start up an instance of app
const app = express();

/* Middlewear */
// Configure express to use body-parser as middle-ware.
// I removed these lines because they were not needed

// Cors for cross origin allowance
app.use(cors());

// Initialise the main project folder
app.use(express.static("website"));

// GET route to return projectData object
app.get("/data", (req, res) => {
  res.send(projectData);
});

app.get("/getWeather", async (req, res) => {
  const zipCode = req.query.zip;
  const apiUrl = `${baseUrl}${zipCode}&appid=${apiKey}&units=metric`;

  try {
    const apiResponse = await fetch(apiUrl);
    const apiData = await apiResponse.json();

    console.log(`Fetchin ${apiUrl}`);

    res.send(apiData);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

// POST route that adds incoming data to projectData
app.post("/addData", (req, res) => {
  projectData = { ...projectData, ...req.body };
  console.log("Data added to projectData", projectData);
  res.send({ message: "Data received", projectData });
});

// Setup Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
