import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

interface RSVP {
  id: number;                // 'id' should be a number
  status: 'interested' | 'going' | 'not going';  // Status type should match the enum in the model
  userId: number;            // 'userId' is a number
  eventId: number;           // 'eventId' is a number
  createdAt: string;         // Created timestamp (string format)
  updatedAt: string;         // Updated timestamp (string format)
}

const RSVPPage = () => {
  const { rsvpId } = useParams<{ rsvpId: string }>() // Use rsvpId to get the specific RSVP
  const [rsvp, setRsvp] = useState<RSVP | null>(null) // State for the RSVP data
  const [error, setError] = useState<string | null>(null) // State for error handling

  useEffect(() => {
    const fetchRsvp = async () => {
      try {
        const response = await axios.get(`/api/rsvps/${rsvpId}`) // Make an API call to fetch RSVP details
        
        setRsvp(response.data) // Set the response data to the RSVP state
      } catch (err) {
        setError('Failed to load RSVP details.') // Handle any error that occurs
      }
    }

    if (rsvpId) {
      fetchRsvp() // Call the function to fetch the RSVP if the rsvpId exists
    }
  }, [rsvpId]) // Re-run the effect whenever rsvpId changes

  return (
    <div>
      <h2>RSVP Details</h2> {/* Display the title for the RSVP page */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if there's an error */}
      {rsvp ? ( // If the RSVP data is available
        <div>
          <p>Status: {rsvp.status}</p>
          <p>User ID: {rsvp.userId}</p>
          <p>Event ID: {rsvp.eventId}</p>
          <p>Created At: {rsvp.createdAt}</p>  {/* Show createdAt if you want */}
          <p>Updated At: {rsvp.updatedAt}</p>  {/* Show updatedAt if you want */}
        </div>
      ) : (
        <p>Loading...</p> // Show loading message while waiting for RSVP data
      )}
    </div>
  )
}

export default RSVPPage
