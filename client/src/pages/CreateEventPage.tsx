import { useState } from "react";
import { createEvent } from "../components/eventDetails"; // API call to save event
import { getAIWeather } from "../components/eventDetails"; // OpenAI integration

const API_KEY = "YOUR_OPENWEATHER_API_KEY";

const CreateEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState<string | null>(null);
    const [loadingWeather, setLoadingWeather] = useState(false);
    const [rsvp, setRSVP] = useState<"Yes" | "No" | "Maybe">("Yes"); // Default RSVP selection

    // Fetch weather when the user enters a location
    const fetchWeather = async (location: string) => {
        if (!location) return;
        setLoadingWeather(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            if (data.cod === 200) {
                setWeather(`${data.weather[0].description}, ${data.main.temp}°C`);
            } else {
                setWeather("Location not found");
            }
        } catch (err) {
            console.error("Failed to fetch weather:", err);
            setWeather("Error fetching weather");
        }
        setLoadingWeather(false);
    };

    // Fetch event description from OpenAI API based on the title
    const generateDescription = async () => {
        if (!title) return;
        try {
            const generatedDescription = await getAIWeather(title);
            setDescription(generatedDescription);
        } catch (err) {
            console.error("Failed to generate description:", err);
        }
    };

    // Handle event creation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEvent({ title, description, date, time, location, attendees: [{ id: "user-id", name: "Organizer", rsvp }] });
            alert("Event created successfully!");
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");
            setLocation("");
            setWeather(null);
            setRSVP("Yes");
        } catch (err) {
            console.error("Failed to create event:", err);
            alert("Failed to create event");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Create an Event</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Event Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full p-2 border rounded-lg"
                    />
                    <button 
                        type="button"
                        onClick={generateDescription}
                        className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    >
                        Generate Description with AI
                    </button>
                </div>

                <div>
                    <label className="block text-gray-700">Event Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Date</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Time</label>
                        <input 
                            type="time" 
                            value={time} 
                            onChange={(e) => setTime(e.target.value)} 
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Location</label>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => {
                            setLocation(e.target.value);
                            fetchWeather(e.target.value);
                        }} 
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Weather Forecast</label>
                    <p className="p-2 border rounded-lg bg-gray-100">{loadingWeather ? "Loading..." : weather || "Enter location to see weather"}</p>
                </div>

                <div>
                    <label className="block text-gray-700">Your RSVP</label>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            className={`py-2 px-4 rounded-lg ${rsvp === "Yes" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                            onClick={() => setRSVP("Yes")}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className={`py-2 px-4 rounded-lg ${rsvp === "No" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                            onClick={() => setRSVP("No")}
                        >
                            No
                        </button>
                        <button
                            type="button"
                            className={`py-2 px-4 rounded-lg ${rsvp === "Maybe" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
                            onClick={() => setRSVP("Maybe")}
                        >
                            Maybe
                        </button>
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;

