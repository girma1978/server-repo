import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Event {
  title: string;
  description?: string; // Optional field
  date: string | Date;
  time: string;
  location: string;
  createdAt?: string; // Optional field for created date
  updatedAt?: string; // Optional field for updated date
}

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to load event details.');
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  return (
    <div>
      <h2>Event Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {event ? (
        <div>
          <h3>{event.title}</h3>
          <p>{event.description || "No description available"}</p> {/* Optional description */}
          <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p> {/* Format date */}
          <p>Location: {event.location}</p>
          <p><strong>Created At:</strong> {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : "N/A"}</p> {/* Optional createdAt */}
          <p><strong>Updated At:</strong> {event.updatedAt ? new Date(event.updatedAt).toLocaleDateString() : "N/A"}</p> {/* Optional updatedAt */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventPage;
