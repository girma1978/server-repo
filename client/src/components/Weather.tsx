import { useState } from "react";

const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // Replace with actual API key

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<string | null>(null);

    const getWeather = async () => {
        if (!city.trim()) {
            alert("Please enter a city name");
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) throw new Error("City not found");

            const data = await response.json();
            setWeather(`${data.weather[0].description}, ${data.main.temp}°C`);
        } catch (error) {
            console.error("Error fetching weather:", error);
            setWeather("Error fetching weather");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2"
            />
            <button onClick={getWeather} className="bg-blue-500 text-white p-2 ml-2">Get Weather</button>
            <div className="mt-4">{weather && <p>{weather}</p>}</div>
        </div>
    );
};

export default Weather;
