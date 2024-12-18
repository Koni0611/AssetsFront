/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserInfo() {
  const [userInfo, setUserInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (role === 'admin') {
          const response = await axios.get('http://localhost:8080/api/register/all');
          setUserInfo(response.data);
        } else {
          const response = await axios.get('http://localhost:8080/api/register/user-info');
          setUserInfo([response.data]);
        }
      } catch (error) {
        setErrorMessage('Failed to load user info. Please try again later.');
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [role]);

  const handleDelete = async (identityNumber) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/register/delete/${identityNumber}`);
      alert('User deleted successfully');
      // Remove the deleted user from the state
      setUserInfo(userInfo.filter((user) => user.identityNumber !== identityNumber));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user. Please try again later.');
    }
  };

  const handleUpdate = (identityNumber) => {
    navigate(`/update/${identityNumber}`); // Navigate to the Update page with identityNumber
  };
  
  
  
  const handleChange = (event) => {
    // Update user state when form fields are changed
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleAddAdmin = () => {
    console.log('Navigating to Add Admin page'); // Debug log
    navigate('/add-admin'); // Navigate to Add Admin page
  };

  const handleAssetManagement = () => {
    navigate('/assets');
  };

  return (
    <div className="container">
      <h2>{role === 'admin' ? 'All Users' : 'Your Info'}</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.length > 0 ? (
              userInfo.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
         {(role === 'admin' || (role === 'user' && user.id === Number(userId))) && (
          <>
          <button onClick={() => handleUpdate(user.identityNumber)}>Update</button>
           <button onClick={() => handleDelete(user.identityNumber)}>Delete</button>
          </>
           )}
          </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        {role && <button onClick={handleAssetManagement}>Asset Management</button>}
        {role === 'admin' && <button onClick={handleAddAdmin}>Add New Admin</button>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserInfo;
