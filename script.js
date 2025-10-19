const apiKey = "6daf7acf111c293e28559d4b86a5e834";

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.cod === "404") {
      document.getElementById(
        "weatherResult"
      ).innerHTML = `<p>City not found ❌</p>`;
    } else {
      showWeather(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showWeather(data) {
  const { name, main, weather } = data;

  if (!weather || !weather[0]) {
    document.getElementById(
      "weatherResult"
    ).innerHTML = `<p>Weather data not available ❌</p>`;
    return;
  }

  document.getElementById("weatherResult").innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <p>🌡️ Temperature: ${main.temp}°C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
  `;
}
