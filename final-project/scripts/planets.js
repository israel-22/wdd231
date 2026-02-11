// ================================
// PLANET DATA SERVICE
// ================================

export async function getPlanets() {
  try {
    const response = await fetch('./data/planets.json');

    if (!response.ok) {
      throw new Error('Error loading local planet data');
    }

    const data = await response.json();

    // Normalizamos los datos por seguridad
    return data.map(planet => ({
      name: planet.name,
      description: planet.description,
      moons: planet.moons ?? 0,
      image: planet.image ?? '',
      distance: planet.distance ?? 'Unknown'
    }));

  } catch (error) {
    console.error('Planet data error:', error);
    return [];
  }
}
