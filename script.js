// updated ha yeh wale js
// Weather App JavaScript
// This script fetches weather data from an API and displays it in a web application.

// Ensure the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");

  // LEFT PANEL ELEMENTS
  const cityNameEl = document.getElementById("city-name");
  const temperatureEl = document.getElementById("temperature");
  const conditionEl = document.getElementById("condition");
  const humidityEl = document.getElementById("humidity");
  const windEl = document.getElementById("wind");

  // CENTER PANEL ELEMENTS
  const weatherConditionEl = document.getElementById("weather-condition");
  const dateTimeEl = document.getElementById("date-time");
  const weatherDescEl = document.getElementById("weather-description");
  const mainTempEl = document.getElementById("temperature");
  const feelsLikeEl = document.getElementById("feels-like");
  const humidityCenterEl = document.getElementById("humidity");
  const windCenterEl = document.getElementById("wind");

  // RIGHT PANEL ELEMENTS khuch isme chal nahe rahe 
  const pressureEl = document.getElementById("pressure");
  const visibilityEl = document.getElementById("visibility");
  const sunriseEl = document.getElementById("sunrise");
  const sunsetEl = document.getElementById("sunset");
  const uvIndexEl = document.getElementById("uv-index");
  const dewPointEl = document.getElementById("dew-point");
  const cloudinessEl = document.getElementById("cloudiness");

  searchBtn.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    try {
      const data = await fetchWeatherData(city);
      displayWeather(data);
    } catch (e) {
      alert("Failed to fetch data. Check city name or internet.");
      console.error(e);
    }
  });

  async function fetchWeatherData(city) {
    const API_KEY = "79c7740ad40f4226a7635000251605";
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeather(data) {
    const location = data.location;
    const current = data.current;

    // LEFT PANEL
    cityNameEl.textContent = `City: ${location.name}`;
    temperatureEl.textContent = `Temperature: ${current.temp_c}°C`;
    conditionEl.textContent = `Condition: ${current.condition.text}`;
    humidityEl.textContent = `Humidity: ${current.humidity}%`;
    windEl.textContent = `Wind: ${current.wind_kph} kph`;

    // CENTER PANEL
    weatherConditionEl.textContent = `${current.condition.text}`;
    dateTimeEl.textContent = `Date & Time: ${location.localtime}`;
    weatherDescEl.textContent = `Feels like ${current.feelslike_c}°C, with ${current.condition.text.toLowerCase()}.`;
    mainTempEl.textContent = `${current.temp_c}°C`;
    feelsLikeEl.textContent = `Feels like: ${current.feelslike_c}°C`;
    humidityCenterEl.textContent = `Humidity: ${current.humidity}%`;
    windCenterEl.textContent = `Wind: ${current.wind_kph} kph`;

    // RIGHT PANEL (optional fallback if data not in API response)
    pressureEl.textContent = `Pressure: ${current.pressure_mb} mb`;
    visibilityEl.textContent = `Visibility: ${current.vis_km} km`;
    sunriseEl.textContent = `Sunrise: N/A (not in current endpoint)`;
    sunsetEl.textContent = `Sunset: N/A (not in current endpoint)`;
    uvIndexEl.textContent = `UV Index: ${current.uv}`;
    dewPointEl.textContent = `Dew Point: N/A (not in current endpoint)`;
    cloudinessEl.textContent = `Cloudiness: ${current.cloud}%`;
  }
});
