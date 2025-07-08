// src/App.js (or App.jsx) - Final Corrected version
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Import your page components
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import IncidentsPage from './pages/IncidentsPage';
import CalendarPage from './pages/CalendarPage';
import PatientDashboard from './pages/PatientDashboard';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage'; // <--- NEW IMPORT

// Import your layout and private route components
import Layout from './pages/Layout'; // Confirmed path
import PrivateRoute from './components/Common/PrivateRoute';

function App() {
  const { user } = useAuth();
  const appIsLoading = false; // Manage this if your app has an async initialization process

  if (appIsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading application...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* 1. Public Auth Page */}
      <Route path="/login" element={<AuthPage />} />

      {/* 2. Redirect authenticated users from /login to their dashboards */}
      {/* This is crucial. If a user is already logged in and tries to go to /login,
            they should be redirected immediately. */}
      {user ? (
        user.role === 'Admin' ? (
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        ) : (
          <Route path="/login" element={<Navigate to="/patient-dashboard" replace />} />
        )
      ) : null}

      {/* 3. Handle the root path "/" */}
      {/* If a user is not logged in, redirect them to /login.
            If they are logged in, redirect them to their respective dashboard. */}
      <Route
        path="/"
        element={
          user ? (
            user.role === 'Admin' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/patient-dashboard" replace />
            )
          ) : (
            <Navigate to="/login" replace /> // Redirect unauthenticated user to login
          )
        }
      />

      {/* 4. Protected Routes for Admin */}
      <Route element={<PrivateRoute requiredRole="Admin" />}>
        {/* These routes will only be accessible if PrivateRoute determines user is 'Admin' */}
        <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
        <Route path="/patients" element={<Layout><PatientsPage /></Layout>} />
        <Route path="/incidents" element={<Layout><IncidentsPage /></Layout>} />
        <Route path="/calendar" element={<Layout><CalendarPage /></Layout>} />
      </Route>

      {/* 5. Protected Routes for Patient */}
      <Route element={<PrivateRoute requiredRole="Patient" />}>
        <Route path="/patient-dashboard" element={<Layout><PatientDashboard /></Layout>} />
      </Route>

      {/* 6. Unauthorized Page - Handles role mismatches/access denials */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} /> {/* <--- NEW ROUTE */}

      {/* 7. Catch-all for 404 Not Found - place last */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App; // Assuming index.js wraps this in Router and Providers