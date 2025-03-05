import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description?: string;
  date: string | Date;
  time: string;
  location: string;
  organizerId: number;
  createdAt?: string;
  updatedAt?: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    id: 0,
    title: '',
    description: '',
    date: '', // Make sure this is a string formatted as 'YYYY-MM-DD'
    time: '',
    location: '',
    organizerId: 1,
  });
  const navigate = useNavigate();

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://server-repo-pdaf.onrender.com/api/events/');
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          setError('Unexpected response format. Expected an array.');
        }
      } catch (err: any) {
        console.error('Error fetching events:', err);
        setError('Failed to load events.');
      }
    };

    fetchEvents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Handle form submission to add a new event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting new event:', newEvent);

      // POST request to create a new event
      const response = await axios.post('https://server-repo-pdaf.onrender.com/api/events/', newEvent);
      console.log('Backend response:', response.data);

      if (response.data) {
        setEvents((prevEvents) => [...prevEvents, response.data]);
        setNewEvent({
          id: 0,
          title: '',
          description: '',
          date: '', // Reset date to empty string
          time: '',
          location: '',
          organizerId: 1,
        });
        setError(null);
      } else {
        setError('Unexpected response from the server.');
      }
    } catch (err: any) {
      console.error('Error adding event:', err);
      setError('Failed to add event.');
    }
  };

  // Navigate to home page
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="event-list-container">
      <h2 className="event-list-header">Event List</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Button to go back to the home page */}
      <button className="go-home-button" onClick={goToHome}>Back to Home</button>

      {/* Event creation form */}
      <h3>Create a New Event</h3>
      <form onSubmit={handleSubmit} className="create-event-form">
        <input
          type="text"
          name="title"
          value={newEvent.title}
          placeholder="Event Title"
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          value={newEvent.description || ''}
          placeholder="Event Description"
          onChange={handleInputChange}
        />
        {/* Format the date correctly for the input type="date" */}
        <input
          type="date"
          name="date"
          value={newEvent.date instanceof Date ? newEvent.date.toISOString().split('T')[0] : newEvent.date} // Format the date if it is a Date object
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          value={newEvent.location}
          placeholder="Event Location"
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <ul className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id} className="event-item">
              <h3>{event.title}</h3>
              <p><strong>Description:</strong> {event.description || "No description available"}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </li>
          ))
        ) : (
          <p className="no-events-message">No events available</p>
        )}
      </ul>
    </div>
  );
};

export default EventList;
