const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const weatherDesc = document.getElementById("weather-desc");
const forecastContainer = document.querySelector("#forecast");

const forecastUrl ="https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&units=imperial&appid=200aefc666b78e670c5e0c14f5477e8c";


const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=200aefc666b78e670c5e0c14f5477e8c";



async function apiFetch() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error("Weather error:", error);
  }
}
async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw new Error("Forecast fetch failed");

    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    console.error("Forecast error:", error);
  }
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;F`;

  const icon = data.weather[0].icon;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${icon}.png`
  );
  weatherIcon.setAttribute("alt", desc);
  weatherDesc.textContent = desc;
}

function displayForecast(list) {
  if (!forecastContainer) return;

  forecastContainer.innerHTML = "";

  const middayForecasts = list
    .filter(item => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  middayForecasts.forEach(day => {
    const date = new Date(day.dt_txt);
    const temp = day.main.temp.toFixed(0);
    const icon = day.weather[0].icon;
    const desc = day.weather[0].description;

    const card = document.createElement("div");
    card.classList.add("forecast-day");

    card.innerHTML = `
      <h3>${date.toLocaleDateString("en-US", { weekday: "short" })}</h3>
      <img src="https://openweathermap.org/img/w/${icon}.png" alt="${desc}">
      <p>${temp}°F</p>
    `;

    forecastContainer.appendChild(card);
  });
}


export function getWeather() {
  apiFetch();
}

export function getForecast() {
  fetchForecast();
}

// Footer dynamic content
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;