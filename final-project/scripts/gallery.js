import {getStoredPlanets,setSelectedPlanet,removePlanet} from "./storage.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  const grid = document.querySelector("#gallery-grid");
  const emptyMessage = document.querySelector("#empty-message");

  if (!grid || !emptyMessage) return;

  const planets = getStoredPlanets();

  const counter = document.querySelector("#planet-count");
  if (counter) {
    counter.textContent = `(${planets.length})`;
  }

  if (planets.length === 0) {
    emptyMessage.classList.remove("hidden");
    grid.innerHTML = "";
    return;
  }

  emptyMessage.classList.add("hidden");
  renderGallery(grid, planets);
}

function renderGallery(grid, planets) {
  grid.innerHTML = "";

  planets.forEach((planet) => {
    const card = document.createElement("article");
    card.classList.add("planet-card");

    card.innerHTML = `
      <h3>${planet.name}</h3>
      <img
        src="${planet.image}"
        alt="${planet.name}"
        onerror="this.src='images/placeholder.jpg'"
      >
      <p>${planet.description}</p>

      <div class="planet-meta">
        <span><strong>Moons:</strong> ${planet.moons}</span>
        <span><strong>Distance:</strong> ${planet.distance}</span>
      </div>

      <button class="planet-btn">View planet</button>
      <button class="remove-btn">Remove</button>
    `;

    card.querySelector(".planet-btn").addEventListener("click", () => {
      setSelectedPlanet(planet.id);
      window.location.href = "planets.html";
    });

    card.querySelector(".remove-btn").addEventListener("click", () => {
  removePlanet(planet.id);
  card.remove();

  const remaining = getStoredPlanets();

  // actualizar contador
  const counter = document.querySelector("#planet-count");
  if (counter) {
    counter.textContent = `(${remaining.length})`;
  }

  if (remaining.length === 0) {
    document.querySelector("#empty-message").classList.remove("hidden");
  }
});

grid.appendChild(card);
});
}
