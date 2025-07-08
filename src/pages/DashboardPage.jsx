// src/pages/DashboardPage.jsx
import React from 'react';
import { useData } from '../contexts/DataContext'; // Import useData hook

const DashboardPage = () => {
  const { patients, incidents } = useData();




  
  // --- Calculate KPIs ---
  const totalPatients = patients.length;
  //const totalIncidents = incidents.length;
  const completedIncidents = incidents.filter(i => i.status === 'Completed').length;
  const scheduledIncidents = incidents.filter(i => i.status === 'Scheduled').length;
  const canceledIncidents = incidents.filter(i => i.status === 'Canceled').length;

  // --- Get Upcoming Incidents ---
  const now = new Date();
  const upcomingIncidents = incidents
    .filter(i => new Date(i.appointmentDate) >= now && i.status === 'Scheduled')
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 5); // Show next 5 upcoming incidents

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard Overview</h2>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-5 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-800">Total Patients</h3>
            <p className="text-4xl font-bold text-blue-900">{totalPatients}</p>
          </div>
          {/* You can add an icon here, e.g., <FaUsers className="text-blue-600 text-4xl" /> */}
        </div>

        <div className="bg-green-100 p-5 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-800">Completed Incidents</h3>
            <p className="text-4xl font-bold text-green-900">{completedIncidents}</p>
          </div>
          {/* <FaCheckCircle className="text-green-600 text-4xl" /> */}
        </div>

        <div className="bg-yellow-100 p-5 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-yellow-800">Scheduled Incidents</h3>
            <p className="text-4xl font-bold text-yellow-900">{scheduledIncidents}</p>
          </div>
          {/* <FaCalendarAlt className="text-yellow-600 text-4xl" /> */}
        </div>

        <div className="bg-red-100 p-5 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-800">Canceled Incidents</h3>
            <p className="text-4xl font-bold text-red-900">{canceledIncidents}</p>
          </div>
          {/* <FaTimesCircle className="text-red-600 text-4xl" /> */}
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Appointments (Next 5)</h3>
        {upcomingIncidents.length === 0 ? (
          <p className="text-gray-600">No upcoming appointments scheduled.</p>
        ) : (
          <ul className="space-y-4">
            {upcomingIncidents.map(incident => (
              <li key={incident.id} className="p-4 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition duration-150 ease-in-out">
                <p className="text-lg font-semibold text-blue-800">{incident.title}</p>
                <p className="text-gray-700">
                  <span className="font-medium">Patient:</span> {getPatientName(incident.patientId)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Date & Time:</span> {new Date(incident.appointmentDate).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-1">{incident.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* You can add more sections here, e.g., recent activity, charts */}
    </div>
  );
};

export default DashboardPage;