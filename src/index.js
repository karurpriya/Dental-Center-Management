// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import './index.css'; // Your Tailwind CSS or other global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Router here */}
      <AuthProvider> {/* AuthProvider here */}
        <DataProvider> {/* DataProvider here */}
          <App /> {/* Your main App component */}
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);