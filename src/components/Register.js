import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    identityNumber: '',
    gender: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    role: '',
    adminKey: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const validateInput = () => {
    const { identityNumber, phoneNumber, password } = formData;

    // Identity Number Validation
    if (identityNumber.length !== 13 || !/^\d{13}$/.test(identityNumber)) {
      alert('Identity Number must be exactly 13 digits.');
      return false;
    }

    // Phone Number Validation
    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      alert('Phone Number must be exactly 10 digits.');
      return false;
    }

    // Password Validation
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/.test(password)) {
      alert(
        'Password must be at least 7 characters long, contain an uppercase letter, lowercase letter, a number, and a special character.'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return; // Stop form submission if validation fails
    }
    try {
      const { adminKey, ...userData } = formData;

      console.log("Submitting data:", userData, adminKey);

      const response = await axios.post('http://localhost:8080/api/register/save', userData, {
        params: { adminKey: userData.role === 'admin' ? adminKey : undefined },
      });
      alert(response.data);
      navigate('/login');
    } catch (error) {
      console.error("Error response:", error.response);
      alert(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="identityNumber" placeholder="Identity Number" value={formData.identityNumber} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                </td>
              </tr>
              <tr>
                <td>
                  <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  {formData.role === 'admin' && (
                    <input
                      type="password"
                      name="adminKey"
                      placeholder="Enter Admin Key"
                      value={formData.adminKey}
                      onChange={handleChange}
                      required
                    />
                  )}
                  <button type="submit">Register</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>
          Already a user? <Link to="/login">Click to Login</Link>
        </p>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}

export default Register;
