import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the structure of the RSVP data
interface RSVP {
  id: number;
  userId: number;
  eventId: number;
  status: 'interested' | 'going' | 'not going';
  createdAt: string;
  updatedAt: string;
}

const RSVPList = () => {
  const [rsvps, setRsvps] = useState<RSVP[]>([]); // State to hold RSVP data
  const [newRsvp, setNewRsvp] = useState<RSVP>({
    id: 0,
    userId: 0,
    eventId: 0,
    status: 'interested',
    createdAt: '',
    updatedAt: '',
  }); // State for the new RSVP form data
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();  // Initialize useNavigate

  // Fetch RSVPs from the API
  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/rsvps'); // Get RSVPs from API

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setRsvps(response.data); // Set the RSVPs if the response is an array
        } else {
          setError('Unexpected response format. Expected an array.');
        }
      } catch (err: any) {
        console.error('Error fetching RSVPs:', err);
        setError('Failed to load RSVPs.');
      }
    };

    fetchRsvps();
  }, []); // Empty dependency array means this effect runs only once

  // Handle form input changes for new RSVP
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRsvp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for creating a new RSVP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send the POST request to create a new RSVP
      const response = await axios.post('http://localhost:3001/api/rsvps', {
        userId: newRsvp.userId,
        eventId: newRsvp.eventId,
        status: newRsvp.status,
        createdAt: new Date().toISOString(), // Set createdAt to current timestamp
        updatedAt: new Date().toISOString(), // Set updatedAt to current timestamp
      });

      // Add new RSVP to the state
      setRsvps((prevRsvps) => [...prevRsvps, response.data]);

      // Reset form after submission
      setNewRsvp({
        id: 0,
        userId: 0,
        eventId: 0,
        status: 'interested',
        createdAt: '',
        updatedAt: '',
      });
    } catch (err) {
      console.error('Error posting new RSVP:', err);
      setError('Failed to create RSVP.');
    }
  };

  // Navigate to home page
  const goToHome = () => {
    navigate('/');  // This navigates to the Home page
  };

  return (
    <div className="rsvp-list-container">
      <h2 className="rsvp-list-header">RSVP List</h2>

      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}

      {/* Button to go back to the home page */}
      <button className="go-home-button" onClick={goToHome}>Back to Home</button>

      {/* Form to create a new RSVP */}
      <form onSubmit={handleSubmit} className="create-rsvp-form">
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={newRsvp.userId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eventId">Event ID:</label>
          <input
            type="number"
            id="eventId"
            name="eventId"
            value={newRsvp.eventId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={newRsvp.status}
            onChange={handleInputChange}
            required
          >
            <option value="interested">Interested</option>
            <option value="going">Going</option>
            <option value="not going">Not Going</option>
          </select>
        </div>
        <button type="submit">Submit RSVP</button>
      </form>

      <ul className="rsvp-list">
        {rsvps.length > 0 ? (
          rsvps.map((rsvp) => (
            <li key={rsvp.id} className="rsvp-item">
              <p><strong>Status:</strong> {rsvp.status}</p>
              <p><strong>User ID:</strong> {rsvp.userId}</p>
              <p><strong>Event ID:</strong> {rsvp.eventId}</p>
              <p><strong>Created At:</strong> {new Date(rsvp.createdAt).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(rsvp.updatedAt).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p className="no-rsvps-message">No RSVPs available</p> // Display message if no RSVPs are available
        )}
      </ul>
    </div>
  );
};

export default RSVPList;
