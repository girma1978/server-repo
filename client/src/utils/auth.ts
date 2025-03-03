import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    // Check if the user is logged in using the AuthService's loggedIn method
    if (!Auth.loggedIn()) {
      throw new Error('User is not logged in');
    }

    // Fetch request to retrieve users
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,  // Get token from AuthService
      },
    });

    // Check if the response is OK, and parse the data
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Invalid user API response: ${errorData.message || 'Unknown error'}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();
    return data;
  } catch (err) {
    // Log the error to the console and return an empty array if something fails
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };
