// GET request to get data from OpenWeatherMap API
const getWeatherData = async (zipCode) => {
  // Construct the full URL
  const url = `/getWeather?zip=${zipCode}`;

  try {
    // Fetch the data from your server
    const response = await fetch(url);

    // Convert the response to JSON
    const weatherData = await response.json();

    // extract the data we need
    const dataToPost = {
      temperature: weatherData.main.temp,
      date: new Date(),
      userResponse: document.getElementById("feelings").value,
    };

    // Post the data to the server
    await postData("/addData", dataToPost);

    // use the data
    console.log(weatherData);

    // update the UI with the data
    document.getElementById("weatherData").innerHTML = `
		Temperature: ${dataToPost.temperature},
		Date: ${dataToPost.date},
		Your Feelings: ${dataToPost.userResponse}`;
  } catch (error) {
    console.error("Error", error);
  }
};

// POST function - post data to server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: `POST`,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

// this callback does not have the base url or api key because
// those live server side to try and keep separations of concerns
// but I am not sure I did this right
document.getElementById("generate").addEventListener("click", () => {
  const zipCode = document.getElementById("zipCode").value;
  getWeatherData(zipCode);
});
