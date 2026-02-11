document.addEventListener("DOMContentLoaded", init);

import { getPlanets } from './planets.js';
console.log("API planets loaded");

let grid;



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

function renderPlanets(planets) {
  grid.innerHTML = '';

  planets.forEach(planet => {
    const card = document.createElement('article');
    card.classList.add('planet-card');

    card.innerHTML = `
      <h3>${planet.name}</h3>
      <div class="planet-meta">
        <span><strong>Gravity:</strong> ${planet.gravity} m/s²</span>
        <span><strong>Radius:</strong> ${planet.meanRadius} km</span>
        <span><strong>Moons:</strong> ${planet.moons}</span>

      </div>
    `;

    grid.appendChild(card);
  });
}

async function init() {
  grid = document.querySelector('#planet-grid');
  if (!grid) return;

  const planets = await getPlanets();
  renderPlanets(planets);
}
