// GET request to get data from OpenWeatherMap API
const getWeatherData = async (zipCode) => {
  // Construct the full URL
  const url = `/getWeather?zip=${zipCode}`;

  try {
    // Fetch teh data from your server
    const response = await fetch(url);

    // Convert the response to JSON
    const data = await response.json();

    // use the data
    console.log(data);
    document.getElementById("weatherData").innerHTML = JSON.stringify(data);
  } catch (error) {
    console.error("Error", error);
  }
};

getWeatherData("94040");
