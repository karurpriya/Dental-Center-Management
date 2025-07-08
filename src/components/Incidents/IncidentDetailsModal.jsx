// src/components/Incidents/IncidentDetailsModal.jsx
import React from 'react';

const IncidentDetailsModal = ({ incident, patients, onClose }) => {
  if (!incident) return null;

  const patient = patients.find(p => p.id === incident.patientId);
  const patientName = patient ? patient.name : 'Unknown';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Incident Details</h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <div className="space-y-3 text-gray-700">
          <p><strong>Patient:</strong> {patientName}</p>
          <p><strong>Title:</strong> {incident.title}</p>
          <p><strong>Description:</strong> {incident.description}</p>
          {incident.comments && <p><strong>Comments:</strong> {incident.comments}</p>}
          <p><strong>Appointment Date:</strong> {new Date(incident.appointmentDate).toLocaleString()}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${
              incident.status === 'Completed' ? 'text-green-600' :
              incident.status === 'Scheduled' ? 'text-blue-600' :
              'text-red-600'
            }`}>{incident.status}</span></p>

          {incident.status === 'Completed' && (
            <>
              {incident.cost && <p><strong>Cost:</strong> ${incident.cost}</p>}
              {incident.treatment && <p><strong>Treatment:</strong> {incident.treatment}</p>}
              {incident.nextDate && <p><strong>Next Appointment:</strong> {new Date(incident.nextDate).toLocaleDateString()}</p>}
            </>
          )}

          {/* File attachments - currently just placeholders */}
          {incident.files && incident.files.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-gray-800">Attachments:</p>
              <ul className="list-disc list-inside text-sm text-blue-600">
                {incident.files.map((file, index) => (
                  <li key={index}>
                    <a href={file.url || '#'} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {file.name || `File ${index + 1}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailsModal;