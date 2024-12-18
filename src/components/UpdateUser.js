import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { identityNumber } = useParams(); // Get the user's identityNumber from the URL
  const navigate = useNavigate(); // Navigation hook for redirecting
  const [user, setUser] = useState(null); // State to hold user data
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/register/user/${identityNumber}`);
        setUser(response.data); // Populate the form with user data
      } catch (error) {
        console.error('Error fetching user:', error);
        setErrorMessage('Failed to load user details. Please try again later.');
      }
    };

    fetchUser();
  }, [identityNumber]);

  const handleUpdate = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Prepare the payload for update
      const updatableFields = {
        name: user.name,
        surname: user.surname,
        gender: user.gender,
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      console.log('Identity Number:', identityNumber);
      console.log('Payload for update:', updatableFields);

      // Make the PUT request to update the user
      await axios.put(`http://localhost:8080/api/register/update/${identityNumber}`, updatableFields);

      alert('User updated successfully');
      navigate(`/user-info/${identityNumber}`);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update the user. Please try again later.');
    }
  };

  const handleChange = (event) => {
    // Update user state when form fields are changed
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  if (!user) return <p>Loading...</p>; // Display loading message while fetching data

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update User</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name || ''}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Surname:
        <input
          type="text"
          name="surname"
          value={user.surname || ''}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        Gender:
        <select
          name="gender"
          value={user.gender || ''}
          onChange={handleChange}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          
        </select>
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="phoneNumber"
          value={user.phoneNumber || ''}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Update User</button>
      <button type="button" onClick={() => navigate('/users')}>
        Cancel
      </button>
    </form>
  );
}

export default UpdateUser;
