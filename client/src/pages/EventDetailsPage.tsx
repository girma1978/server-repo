import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventDetails, rsvpEvent } from "../components/eventDetails";
import { getAIWeather } from "../components/eventDetails"; // OpenAI integration
import auth from "../utils/auth";
import ErrorPage from "./ErrorPage";

const EventDetails = () => {
  const { eventId } = useParams();

  interface Attendee {
    id: string;
    name: string;
    rsvp: "Yes" | "No" | "Maybe";
  }

  interface Event {
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    attendees: Attendee[];
  }

  const [event, setEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [weather, setWeather] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  });

  const fetchEventDetails = async () => {
    try {
      if (eventId) {
        const data = await getEventDetails(eventId);
        const attendeesWithRSVP = data.attendees.map(
          (attendee: {
            id: string;
            name: string;
            rsvp?: "Yes" | "No" | "Maybe";
          }) => ({
            ...attendee,
            rsvp: attendee.rsvp || "Maybe",
          })
        );
        setEvent({ ...data, attendees: attendeesWithRSVP });
        setAttendees(attendeesWithRSVP);
        fetchWeather(data.location);
      } else {
        console.error("Event ID is undefined");
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch event details:", err);
      setError(true);
    }
  };

  const fetchWeather = async (location: string) => {
    try {
      const weatherData = await getAIWeather(location);
      setWeather(weatherData);
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
    }
  };

  const handleRSVP = async (response: "Yes" | "No" | "Maybe") => {
    try {
      if (!eventId) {
        console.error("Event ID is undefined");
        return;
      }
      const updatedAttendees = (await rsvpEvent(eventId, response)).map(
        function (attendee: {
          id: string;
          name: string;
          rsvp?: "Yes" | "No" | "Maybe";
        }) {
          return {
            ...attendee,
            rsvp: attendee.rsvp || "Maybe",
          };
        }
      ) as Attendee[];
      setAttendees(updatedAttendees);
    } catch (err) {
      console.error("Failed to RSVP:", err);
    }
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {event ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {event.title}
          </h1>
          <p className="text-gray-600 mb-2">{event.description}</p>
          <p className="text-gray-700">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-700">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="text-gray-700">
            <strong>Time:</strong> {event.time}
          </p>
          <p className="text-gray-700">
            <strong>Weather Forecast:</strong> {weather || "Loading..."}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">
            Attendees
          </h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {attendees.map((user) => (
              <li key={user.id}>
                {user.name} - <span className="font-semibold">{user.rsvp}</span>
              </li>
            ))}
          </ul>

          {auth.loggedIn() && (
            <div className="mt-4 flex space-x-3">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={() => handleRSVP("Yes")}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={() => handleRSVP("No")}
              >
                No
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                onClick={() => handleRSVP("Maybe")}
              >
                Maybe
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-700 text-center">Loading event details...</p>
      )}
    </div>
  );
};

export default EventDetails;
