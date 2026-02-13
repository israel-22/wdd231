import { getPlanets } from "./planets.js";
import { setSelectedPlanet } from "./storage.js";
import { getApod } from "./nasa.js";


let grid;

document.addEventListener("DOMContentLoaded", init);

// === Mobile navigation ===
function setupMobileMenu() {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggleButton || !nav) return;

  toggleButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// === Init ===
async function init() {
  grid = document.querySelector("#planet-grid");
  if (!grid) return;

  setupMobileMenu();

  const planets = await getPlanets();
  renderPlanets(planets);
  loadNasaApod();
  async function loadNasaApod() {
  const container = document.querySelector("#nasa-apod");
  if (!container) return;

  const data = await getApod();

  if (!data) {
    container.innerHTML = "<p>NASA content unavailable.</p>";
    return;
  }

  container.innerHTML = `
    <img src="${data.url}" alt="${data.title}">
    <h3>${data.title}</h3>
    <p>${data.explanation}</p>
  `;
}


}

// === Render cards ===
function renderPlanets(planets) {
  grid.innerHTML = "";

  planets.forEach((planet) => {
    const card = document.createElement("article");
    card.classList.add("planet-card");

    card.innerHTML = `
      <h3>${planet.name}</h3>
      <img
        src="${planet.image}"
        alt="${planet.name} planet"
        loading="lazy"
        onerror="this.src='images/placeholder.jpg'"
      >
      <p>${planet.description}</p>
      <span><strong>Moons:</strong> ${planet.moons}</span>
      <span><strong>Distance:</strong> ${planet.distance}</span>
      <button class="planet-btn" data-id="${planet.id}">
        View planet
      </button>
    `;

    const button = card.querySelector(".planet-btn");
    button.addEventListener("click", () => {
      setSelectedPlanet(planet.id);
      window.location.href = "planets.html";
    });

    grid.appendChild(card);
  });
  
}
