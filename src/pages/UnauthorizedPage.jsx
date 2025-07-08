// src/pages/UnauthorizedPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UnauthorizedPage: Rendered. Initiating redirect to login in 3 seconds.");
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-xl text-gray-700 mb-2">You do not have permission to view this page.</p>
      <p className="text-lg text-gray-600">Redirecting to the login page...</p>
    </div>
  );
};

export default UnauthorizedPage;