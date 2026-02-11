const NASA_API_KEY = 'DEMO_KEY'; // Replace with your actual NASA API key
const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export async function getApod() {
    try{
        const response = await fetch(NASA_URL);
        if (!response.ok){
            throw new Error ('Error fetching data from NASA API');

        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error('Nasa API error:', error);
        return null;
    }
    
}
