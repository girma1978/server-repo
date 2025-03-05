import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define the structure of the user data based on your model
interface User {
  id: number;          // 'id' is a number, not a string
  username: string;    // 'username' from the model
  email: string;       // 'email' from the model
  createdAt: string;   // 'createdAt' timestamp
  updatedAt: string;   // 'updatedAt' timestamp
}

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user details.');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <div className="user-page-container">
      <h2 className="user-page-header">User Details</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p> {/* Formatting created date */}
          <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p> {/* Formatting updated date */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
