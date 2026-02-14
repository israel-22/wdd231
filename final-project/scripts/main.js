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

  renderPlanetSkeletons(6);

  const planets = await getPlanets();
  renderPlanets(planets);

  loadNasaApod();
}


// === NASA APOD ===
async function loadNasaApod() {
  const container = document.querySelector("#nasa-apod");
  if (!container) return;

  const data = await getApod();

  if (!data) {
    container.innerHTML = "<p>NASA content unavailable.</p>";
    return;
  }
if (data.media_type === "image") {
   container.classList.remove("apod-loading");
 container.innerHTML = `
  <div class="apod">
    <div class="apod-media">
      <img
        src="${data.url}"
        alt="${data.title}"
        loading="lazy"
      >
    </div>
    <div class="apod-overlay"></div>
    <div class="apod-content">
      <h3 class="apod-title">${data.title}</h3>
      <p class="apod-text">${data.explanation}</p>
      <span class="apod-source">NASA · Astronomy Picture of the Day</span>
      <span class="apod-source">
          NASA · APOD · ${data.date}
          ${data.copyright ? `· © ${data.copyright}` : ""}
        </span>
    </div>
  </div>
`;
} else {
  container.innerHTML = `
    <div class="apod apod-video">
      <div class="apod-content">
        <h3 class="apod-title">${data.title}</h3>
        <p class="apod-text">
          Today's Astronomy Picture of the Day is a video.
        </p>
        <a class="apod-source" href="${data.url}" target="_blank" rel="noopener">
          Watch on NASA
        </a>
      </div>
    </div>
  `;
}
const img = container.querySelector("img");

if (img) {
  img.addEventListener("load", () => {
    img.classList.add("loaded");
  });
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

    // === Focus mode ===
    card.addEventListener("mouseenter", () => {
      grid.classList.add("focus-mode");
      card.classList.add("is-focused");
    });

    card.addEventListener("mouseleave", () => {
      grid.classList.remove("focus-mode");
      card.classList.remove("is-focused");
    });

    // === Click ===
    button.addEventListener("click", () => {
      card.classList.add("is-focused");
      setTimeout(() => {
        setSelectedPlanet(planet.id);
        window.location.href = "planets.html";
      }, 200);
    });

    grid.appendChild(card);
  });
}
function renderPlanetSkeletons(count = 6) {
  grid.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("article");
    skeleton.classList.add("planet-skeleton");

    skeleton.innerHTML = `
      <div class="planet-skeleton-img"></div>
      <div class="planet-skeleton-line"></div>
      <div class="planet-skeleton-line short"></div>
    `;

    grid.appendChild(skeleton);
  }
}
