// src/components/Common/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaStethoscope, FaChartBar, FaTooth } from 'react-icons/fa'; // Install react-icons: npm install react-icons

const Sidebar = ({ userRole }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="text-3xl font-extrabold text-blue-400 mb-8 text-center flex items-center justify-center">
        <FaTooth className="mr-2" /> ENTNT
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {userRole === 'Admin' && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition duration-200 ease-in-out ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  <FaChartBar className="mr-3" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/patients"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition duration-200 ease-in-out ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  <FaUser className="mr-3" /> Patients
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/incidents"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition duration-200 ease-in-out ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  <FaStethoscope className="mr-3" /> Incidents
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition duration-200 ease-in-out ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  <FaCalendarAlt className="mr-3" /> Calendar
                </NavLink>
              </li>
            </>
          )}
          {userRole === 'Patient' && (
            <li>
              <NavLink
                to="/patient-dashboard"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ease-in-out ${
                    isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaUser className="mr-3" /> My Appointments
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;