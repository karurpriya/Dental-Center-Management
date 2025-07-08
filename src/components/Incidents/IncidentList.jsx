// src/components/Incidents/IncidentList.jsx
import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Ensure react-icons is installed

const IncidentList = ({ incidents, patients, onEdit, onDelete, onViewDetails }) => {
  if (!incidents || incidents.length === 0) {
    return (
      <p className="text-gray-600">No incidents found. Add your first incident!</p>
    );
  }

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  // Sort incidents by appointmentDate in descending order (most recent first)
  const sortedIncidents = [...incidents].sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Title</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Patient</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date/Time</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedIncidents.map((incident) => (
            <tr key={incident.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-800">{incident.title}</td>
              <td className="py-3 px-4 text-gray-800">{getPatientName(incident.patientId)}</td>
              <td className="py-3 px-4 text-gray-800">{new Date(incident.appointmentDate).toLocaleString()}</td>
              <td className={`py-3 px-4 font-semibold ${
                incident.status === 'Completed' ? 'text-green-600' :
                incident.status === 'Scheduled' ? 'text-blue-600' :
                'text-red-600'
              }`}>
                {incident.status}
              </td>
              <td className="py-3 px-4 text-center flex justify-center space-x-2">
                <button
                  onClick={() => onViewDetails(incident)}
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-150"
                  title="View Details"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => onEdit(incident)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition duration-150"
                  title="Edit Incident"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(incident.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150"
                  title="Delete Incident"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;