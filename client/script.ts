interface WeatherData {
    name: string;
    sys: { country: string };
    main: { temp: number; humidity: number };
    weather: { description: string }[];
    wind: { speed: number };
}
const API_KEY = process.env.OPENWEATHER_API_KEY;
document.getElementById('getWeatherBtn')?.addEventListener('click', () => {
    getWeather();
});
async function getWeather(): Promise<void> {
    const cityInput = document.getElementById('cityInput') as HTMLInputElement;
    const city: string = cityInput.value.trim();
    const weatherResult = document.getElementById('weatherResult') as HTMLElement;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    const lat: number = 0; // Replace 0 with the actual latitude value
    const lon: number = 0; // Replace 0 with the actual longitude value
    const url: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data: WeatherData = await response.json();
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
    }
}
