const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const weatherDesc = document.getElementById("weather-desc");

const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=TU_API_KEY_REAL_AQUI"; /*Entra a openweathermap.org y pega tu api key crea una cuenta gratis*/



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

export function getWeather() {
  apiFetch();
}
