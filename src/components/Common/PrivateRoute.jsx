// src/components/Common/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ requiredRole }) => {
  const { user } = useAuth();

  console.log("--- PrivateRoute Check ---");
  console.log("Path requires role:", requiredRole);
  console.log("Current user in PrivateRoute:", user);
  if (user) {
    console.log(`User role: '${user.role}' (Type: ${typeof user.role}, Length: ${user.role.length})`);
  } else {
    console.log("User is null or undefined.");
  }

  // If no user is logged in, redirect to the login page
  if (!user) {
    console.log("PrivateRoute: No user found. Redirecting to /login.");
    return <Navigate to="/login" replace />;
  }

  // If a role is required and the user's role does not match
  if (requiredRole && user.role !== requiredRole) {
    console.log(`PrivateRoute: User role '${user.role}' DOES NOT MATCH required role '${requiredRole}'.`);
    console.log("PrivateRoute: Redirecting to /unauthorized.");
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is found and authorized (or no role is required)
  console.log("PrivateRoute: User authenticated and authorized. Rendering Outlet.");
  return <Outlet />;
};

export default PrivateRoute;