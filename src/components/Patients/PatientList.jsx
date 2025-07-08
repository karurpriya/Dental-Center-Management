// src/components/Patients/PatientList.jsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Ensure react-icons is installed

const PatientList = ({ patients, onEdit, onDelete }) => {
  if (!patients || patients.length === 0) {
    return (
      <p className="text-gray-600">No patients found. Add your first patient!</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">DOB</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Contact</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Health Info</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-800">{patient.name}</td>
              <td className="py-3 px-4 text-gray-800">{patient.email}</td>
              <td className="py-3 px-4 text-gray-800">{patient.dob}</td>
              <td className="py-3 px-4 text-gray-800">{patient.contact}</td>
              <td className="py-3 px-4 text-gray-800">{patient.healthInfo}</td>
              <td className="py-3 px-4 text-center flex justify-center space-x-2">
                <button
                  onClick={() => onEdit(patient)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition duration-150"
                  title="Edit Patient"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(patient.id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150"
                  title="Delete Patient"
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

export default PatientList;