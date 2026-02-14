const NASA_API_KEY = 'cobcMhO8kShtMMe7nAbHAfKK20UH9FCC5tv476pa'; // Replace with your actual NASA API key
const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

const CACHE_KEY = "apod-cache";
const DATE_KEY = "apod-date";

export async function getApod() {
  const today = new Date().toISOString().split("T")[0];

  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedDate = localStorage.getItem(DATE_KEY);

  
  if (cachedData && cachedDate === today) {
    return JSON.parse(cachedData);
  }

  
  try {
    const response = await fetch(NASA_URL);

    if (!response.ok) {
      throw new Error("NASA API error");
    }

    const data = await response.json();

   
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(DATE_KEY, today);

    return data;
  } catch (error) {
    console.error("NASA APOD error:", error);

    
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    return null;
  }
}
