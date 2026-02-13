// === Keys ===
const SAVED_PLANETS_KEY = "selectedPlanets";
const SELECTED_PLANET_KEY = "selectedPlanet";

// === Gallery: saved planets ===
export function getStoredPlanets() {
  const data = localStorage.getItem(SAVED_PLANETS_KEY);
  return data ? JSON.parse(data) : [];
}

export function savePlanet(planet) {
  const planets = getStoredPlanets();

  const exists = planets.some(p => p.id === planet.id);
  if (!exists) {
    planets.push(planet);
    localStorage.setItem(
      SAVED_PLANETS_KEY,
      JSON.stringify(planets)
    );
  }
}

// === Detail navigation: selected planet ===
export function setSelectedPlanet(planetId) {
  localStorage.setItem(SELECTED_PLANET_KEY, planetId);
}

export function getSelectedPlanet() {
  return localStorage.getItem(SELECTED_PLANET_KEY);
}

export function removePlanet(id) {
  const planets = getStoredPlanets().filter(p => p.id !== id);
  localStorage.setItem("selectedPlanets", JSON.stringify(planets));
}

export function clearPlanets() {
  const planets = [];

  localStorage.setItem(
    SAVED_PLANETS_KEY,
    JSON.stringify(planets)
  );
}
