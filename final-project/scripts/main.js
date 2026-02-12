import { getPlanets } from "./planets.js";
import { saveSelectedPlanet } from "./storage.js";


console.log("API planets loaded");

let grid;

document.addEventListener("DOMContentLoaded", init);

// MOBILE NAVIGATION
function setupMobileMenu() {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggleButton || !nav) return;

  toggleButton.addEventListener("click", () => {
    nav.classList.toggle("open");

    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    toggleButton.setAttribute("aria-expanded", !expanded);
  });
}
async function init() {
  grid = document.querySelector("#planet-grid");
  if (!grid) return;

  setupMobileMenu();

  const planets = await getPlanets();
  renderPlanets(planets);
  setupPlanetLinks();
}

function renderPlanets(planets) {
  grid.innerHTML = "";

  planets.forEach((planet) => {
    const card = document.createElement("article");
    card.classList.add("planet-card");

    card.innerHTML = `
      <h3>${planet.name}</h3>
      <img 
        src="${planet.image || "images/placeholder.jpg"}"
        alt="${planet.name} planet"
        loading="lazy"
        onerror="this.src='images/placeholder.jpg'">
      <p>${planet.description}</p>
      <span><strong>Moons:</strong> ${planet.moons}</span>
      <span><strong>Distance:</strong> ${planet.distance}</span>
       <button class="planet-btn" data-id="${planet.id}">
    View planet
  </button>
    `;

    card.addEventListener("click", () => {
  localStorage.setItem("selectedPlanet", planet.id);
  window.location.href = "planets.html";
});
   

    grid.appendChild(card);
  });
}

function setupPlanetLinks() {
  const buttons = document.querySelectorAll(".planet-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const planetId = btn.dataset.id;
      localStorage.setItem("selectedPlanet", planetId);
      window.location.href = "planets.html";
    });
  });
}
btn.addEventListener("click", () => {
  saveSelectedPlanet(btn.dataset.id);
  window.location.href = "planets.html";
});



export { init };
