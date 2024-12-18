import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAdmin() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    identityNumber: '',
    gender: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    role: 'admin', // Always "admin" for this form
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken'); // Admin's token from login
      const response = await axios.post(
        'http://localhost:8080/api/register/add-admin',
        formData,
        { headers: { Authorization: token } } // Include token in headers
      );
      alert(response.data);
      navigate('/user-info'); // Navigate to User Info page after successful admin creation
    } catch (error) {
      alert(error.response?.data || 'Error occurred while adding admin.');
    }
  };

  // Handle "Back" navigation
  const handleBack = () => {
    navigate('/user-info'); // Navigate back to User Info page
  };

  // Handle "Logout" functionality
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove userId from localStorage
    localStorage.removeItem('role'); // Remove role from localStorage
    localStorage.removeItem('adminToken'); // Remove admin token
    navigate('/login'); // Redirect to Login page
  };

  return (
    <div>
      <h2>Add New Admin</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="identityNumber"
                    placeholder="Identity Number"
                    value={formData.identityNumber}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="gender"
                    placeholder="Gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit">Add Admin</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {/* Back and Logout Buttons */}
        <div className="button-container">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
