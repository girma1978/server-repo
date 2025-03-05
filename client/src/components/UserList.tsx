import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Define the structure of the user data according to the model
interface User {
  id: number;         // 'id' is a number, not a string
  username: string;   // 'username' field from the model
  email: string;      // 'email' field from the model
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]); // State to hold user data
  const [error, setError] = useState<string | null>(null); // Error state
  const [newUser, setNewUser] = useState<{ username: string; email: string; password: string }>({
    username: '',
    email: '',
    password: '',
  }); // State for new user data
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Success message state
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://server-repo-pdaf.onrender.com/api/users'); // Fetch users from the API

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data); // Set users data if it's an array
        } else {
          setError('Unexpected response format. Expected an array.');
        }
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs only once

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('https://server-repo-pdaf.onrender.com/api/users', newUser); // Post new user data

      if (response.status === 201) {
        setSuccessMessage('User created successfully!');
        setUsers((prevUsers) => [...prevUsers, response.data]); // Update users state with the new user
        setNewUser({ username: '', email: '', password: '' }); // Clear the form fields
      }
    } catch (err: any) {
      console.error('Error creating user:', err);
      setError('Failed to create user.');
    }
  };

  // Navigate to home page
  const goToHome = () => {
    navigate('/');  // This navigates to the Home page
  };

  return (
    <div className="user-list-container">
      <h2 className="user-list-header">User List</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}

      {/* Button to go back to the home page */}
      <button className="go-home-button" onClick={goToHome}>Back to Home</button>

      {/* Form to add new user */}
      <div className="create-user-form">
        <h3>Create a New User</h3>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

      {/* Display the list of users */}
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="user-item">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))
        ) : (
          <p className="no-users-message">No users available</p> // Display if there are no users
        )}
      </ul>
    </div>
  );
};

export default UserList;
