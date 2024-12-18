import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to the Asset Management System</h2>
      <nav>
        <ul>
          {/* Removed Asset Management button */}
          <li>
            <button onClick={() => navigate('/login')}>Login</button>
          </li>
          <li>
            <button onClick={() => navigate('/register')}>Register</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
