import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const role = localStorage.getItem('role');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        if (role === 'admin') {
          response = await axios.get('http://localhost:8080/api/register/all');
        } else {
          response = await axios.get('http://localhost:8080/api/register/user-info');
        }
        setUsers(role === 'admin' ? response.data : [response.data]);
      } catch (error) {
        setErrorMessage('Failed to load users. Please try again later.');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [role]);

  const handleDelete = async (identityNumber) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/register/delete/${identityNumber}`);
      alert('User deleted successfully');
      // Remove the deleted user from the state
      setUsers(users.filter(user => user.identityNumber !== identityNumber));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user. Please try again later.');
    }
  };

  const handleUpdate = (identityNumber) => {
    // Navigate to an Update page and pass identityNumber
    navigate(`/update/${identityNumber}`);
  };
  
  
  

  return (
    <div>
      <h2>{role === 'admin' ? 'All Registered Users' : 'Your Info'}</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            {role === 'admin' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.identityNumber}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {role === 'admin' && (
                  <td>
                    <button onClick={() => handleDelete(user.identityNumber)}>Delete</button>
                    <button onClick={() => handleUpdate(user.identityNumber)}>Update</button>
                  </td>
                )}
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
  );
}

export default Users;