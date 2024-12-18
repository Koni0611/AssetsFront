import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot instead of render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();