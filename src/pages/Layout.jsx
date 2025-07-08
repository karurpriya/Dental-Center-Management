// src/pages/Layout.jsx
import React from 'react';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import { useAuth } from '../contexts/AuthContext'; // To pass user info to Sidebar/Header

const Layout = ({ children }) => {
  const { user } = useAuth(); // <--- CORRECTED: Changed 'currentUser' to 'user'

  // This check here in Layout is now largely redundant because PrivateRoute handles it.
  // However, if you want a fallback or quick visual cue for unexpected states, it can stay.
  // But make sure it refers to the correct 'user' property.
  if (!user) { // <--- CORRECTED: Changed 'currentUser' to 'user'
    // This case should ideally be caught by PrivateRoute, but a fallback is good
    // If you remove this, ensure PrivateRoute is always used on all protected routes.
    return <div>Unauthorized access. Redirecting...</div>; // This text should now *never* be seen if PrivateRoute works.
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar userRole={user.role} /> {/* <--- CORRECTED: Changed 'currentUser.role' to 'user.role' */}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Header userName={user.email} userRole={user.role} /> {/* <--- CORRECTED: Changed 'currentUser.email/role' to 'user.email/role' */}
        <main className="flex-1 p-6 overflow-auto">
          {children} {/* This is where the actual page content (DashboardPage, PatientsPage etc.) will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;