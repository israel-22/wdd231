const PLANET_KEY = "selectedPlanet";

export function saveSelectedPlanet(id) {
  localStorage.setItem(PLANET_KEY, id);
}

export function getSelectedPlanet() {
  return localStorage.getItem(PLANET_KEY);
}

export function clearSelectedPlanet() {
  localStorage.removeItem(PLANET_KEY);
}
