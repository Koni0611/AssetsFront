import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/login/login',
        null,
        { params: { username, password } }
      );
      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('adminToken', response.data.token);

        alert('Login successful');
        const redirectTo = location.state?.from || '/user-info';
        navigate(redirectTo);
      }
    } catch (error) {
      console.error("Error during login:", error.response || error);
      setErrorMessage(error.response?.data?.message || 'Unable to connect to the server. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="form-wrapper">
        <form onSubmit={handleLoginSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button type="submit">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button onClick={() => navigate('/')}>Back</button>
        <p>
          Not a registered user? <Link to="/register">Click to Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
