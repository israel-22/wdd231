import { getPlanets } from "./planets.js";
import { getSelectedPlanet } from "./storage.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {
  const container = document.querySelector("#planet-detail");
  if (!container) return;

  const planetId = getSelectedPlanet();

  if (!planetId) {
    container.innerHTML = "<p>No planet selected.</p>";
    return;
  }

  const planets = await getPlanets();
  const planet = planets.find(p => p.id === planetId);

  if (!planet) {
    container.innerHTML = "<p>Planet not found.</p>";
    return;
  }

  renderPlanet(container, planet);
}

function renderPlanet(container, planet) {
  container.innerHTML = `
    <article class="planet-detail-card">
      <img src="${planet.image}" alt="${planet.name}">
      <h2>${planet.name}</h2>
      <p>${planet.description}</p>

      <ul>
        <li><strong>Gravity:</strong> ${planet.gravity} m/s²</li>
        <li><strong>Radius:</strong> ${planet.meanRadius} km</li>
        <li><strong>Moons:</strong> ${planet.moons}</li>
        <li><strong>Distance:</strong> ${planet.distance}</li>
      </ul>
    </article>
  `;
}
