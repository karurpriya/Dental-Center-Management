// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

const DEFAULT_USERS = [
  { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'dev_admin_pass' }, 
  { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'dev_patient_pass', patientId: 'p1' }, 
  { id: '3', role: 'Patient', email: 'raj@gmail.com', password: 'dev_patient_pass', patientId: 'p2' }, 
  { id: '4', role: 'Patient', email: 'tej@entnt.in', password: 'dev_patient_pass', patientId: 'p3' }, 
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const initialUser = storedUser ? JSON.parse(storedUser) : null;
      console.log("AuthContext: Initializing user from localStorage:", initialUser);
      return initialUser;
    } catch (error) {
      console.error("AuthContext: Error parsing currentUser from localStorage, using null:", error);
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const localUsers = localStorage.getItem('users');
      const initialUsers = localUsers ? JSON.parse(localUsers) : DEFAULT_USERS;
      console.log("AuthContext: Initializing users from localStorage or defaults:", initialUsers);
      return initialUsers;
    } catch (error) {
      console.error("AuthContext: Error parsing users from localStorage, using defaults:", error);
      return DEFAULT_USERS;
    }
  });

  useEffect(() => {
    console.log("AuthContext: user state changed, persisting to localStorage:", user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    console.log("AuthContext: users array changed, persisting to localStorage:", users);
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    console.log("--- AuthContext Login Attempt ---");
    console.log("Input Email:", `'${email}'`, "Length:", email.length);
    console.log("Input Password:", `'${password}'`, "Length:", password.length);

    const foundUser = users.find(u => {
      return u.email.trim() === email.trim() && u.password.trim() === password.trim();
    });

    if (foundUser) {
      console.log("AuthContext: Login SUCCESS! Found user:", foundUser);
      setUser(foundUser);
      return true;
    }
    console.log("AuthContext: Login FAILED: No matching user found.");
    setUser(null);
    return false;
  };

  const logout = () => {
    console.log("AuthContext: User logging out.");
    setUser(null);
  };

  const register = (newUser) => {
    const emailExists = users.some(u => u.email.trim() === newUser.email.trim());
    if (emailExists) {
      console.warn('AuthContext: Registration failed: User with this email already exists.');
      alert('User with this email already exists!');
      return false;
    }

    const userWithId = { ...newUser, id: uuidv4() };
    setUsers(prevUsers => [...prevUsers, userWithId]);
    console.log('AuthContext: Registered new user:', userWithId);
    return true;
  };

  const value = {
    user,
    users,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};