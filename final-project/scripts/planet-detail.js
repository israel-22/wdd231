import { getPlanets } from "./planets.js";
import { getSelectedPlanet, savePlanet } from "./storage.js";

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
  savePlanet(planet);
}

function renderPlanet(container, planet) {
  container.innerHTML = `
    <div class="planet-detail-card">
      <img
        src="${planet.image}"
        alt="${planet.name}"
        onerror="this.src='images/placeholder.jpg'"
      >
      <div class="planet-detail-content">
        <h2>${planet.name}</h2>
        <p>${planet.description}</p>

        <div class="planet-detail-meta">
          <span><strong>Gravity:</strong> ${planet.gravity} m/s²</span>
          <span><strong>Radius:</strong> ${planet.meanRadius} km</span>
          <span><strong>Moons:</strong> ${planet.moons}</span>
          <span><strong>Distance:</strong> ${planet.distance}</span>
        </div>

        <div class="planet-fun-fact">
          <p><strong>Fun Fact:</strong> ${
            planet.funFact || "No additional info available."
          }</p>
        </div>

        <button class="planet-detail-btn" onclick="window.history.back();">
          ← Back to Planets
        </button>
      </div>
    </div>
  `;
}
