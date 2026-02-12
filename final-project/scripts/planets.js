export async function getPlanets() {
  try {
    const response = await fetch('./data/planets.json');

    if (!response.ok) {
      throw new Error('Error loading local planet data');
    }

    const data = await response.json();

     return data.map(planet => ({
      id: planet.id,
      name: planet.name,
      description: planet.description,
      gravity: planet.gravity,
      meanRadius: planet.meanRadius,
      moons: planet.moons ?? 0,
      distance: planet.distance ?? 'Unknown',
      image: planet.image || 'images/placeholder.jpg'
    }));

  } catch (error) {
    console.error('Planet data error:', error);
    return [];
  }
}
