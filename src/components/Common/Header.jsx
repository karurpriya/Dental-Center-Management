// src/components/Common/Header.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ userName, userRole }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
      <h1 className="text-2xl font-bold text-gray-800">
        {userRole === 'Admin' ? 'Admin Dashboard' : 'Patient Portal'}
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Hello, <span className="font-semibold">{userName}</span> ({userRole})</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;