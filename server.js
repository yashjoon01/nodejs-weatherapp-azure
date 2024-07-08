const express = require("express");
const axios = require("axios")
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const api_key = "76bb9b4efc923745330806f182aa3da1";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;

  let weather;
  let error = null;
  try {
    const response = await axios.get(URL);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = 'Error, Please try again';
  }

  res.render("index", { weather, error});
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
