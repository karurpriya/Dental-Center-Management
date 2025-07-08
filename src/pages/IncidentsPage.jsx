// src/pages/IncidentsPage.jsx
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import IncidentForm from '../components/Incidents/IncidentForm'; // The form for add/edit
import IncidentDetailsModal from '../components/Incidents/IncidentDetailsModal'; // The modal for viewing details
import { FaEdit, FaTrash, FaEye, FaFileAlt } from 'react-icons/fa'; // Import file icon

const IncidentsPage = () => {
  const { incidents, patients, addIncident, updateIncident, deleteIncident } = useData();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const openAddIncidentModal = () => {
    setSelectedIncident(null); // Clear selected incident for add mode
    setIsFormModalOpen(true);
  };

  const openEditIncidentModal = (incident) => {
    setSelectedIncident(incident);
    setIsFormModalOpen(true);
  };

  const openViewDetailsModal = (incident) => {
    setSelectedIncident(incident);
    setIsDetailsModalOpen(true);
  };

  const closeModals = () => {
    setIsFormModalOpen(false);
    setIsDetailsModalOpen(false);
    setSelectedIncident(null);
  };

  const handleSubmitIncident = (incidentData) => {
    if (incidentData.id) {
      updateIncident(incidentData);
    } else {
      addIncident(incidentData);
    }
    closeModals();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      deleteIncident(id);
    }
  };

  // Memoize incidents sorted by date for consistent display
  const sortedIncidents = useMemo(() => {
    return [...incidents].sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
  }, [incidents]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-160px)]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Incident Management</h2>

      <div className="mb-6 text-right">
        <button
          onClick={openAddIncidentModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Add New Incident
        </button>
      </div>

      {incidents.length === 0 ? (
        <p className="text-gray-600 text-center">No incidents found. Click "Add New Incident" to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Patient</th>
                <th className="py-3 px-6 text-left">Date/Time</th>
                <th className="py-3 px-6 text-left">Status</th>
                {/* NEW COLUMN: Attachments */}
                <th className="py-3 px-6 text-center">Attachments</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {sortedIncidents.map((incident) => {
                const patient = patients.find(p => p.id === incident.patientId);
                const patientName = patient ? patient.name : 'Unknown';

                return (
                  <tr key={incident.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{incident.title}</td>
                    <td className="py-3 px-6 text-left">{patientName}</td>
                    <td className="py-3 px-6 text-left">
                      {new Date(incident.appointmentDate).toLocaleString()}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`py-1 px-3 rounded-full text-xs font-semibold ${
                          incident.status === 'Completed' ? 'bg-green-200 text-green-800' :
                          incident.status === 'Scheduled' ? 'bg-blue-200 text-blue-800' :
                          'bg-red-200 text-red-800'
                        }`}
                      >
                        {incident.status}
                      </span>
                    </td>
                    {/* NEW CELL: Attachments Indicator */}
                    <td className="py-3 px-6 text-center">
                      {incident.files && incident.files.length > 0 ? (
                        <FaFileAlt className="text-blue-500 mx-auto" title={`${incident.files.length} attachment(s)`} />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-3">
                        <button
                          onClick={() => openViewDetailsModal(incident)}
                          className="w-8 h-8 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 flex items-center justify-center transition duration-200"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openEditIncidentModal(incident)}
                          className="w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600 flex items-center justify-center transition duration-200"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(incident.id)}
                          className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition duration-200"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {isFormModalOpen && (
        <IncidentForm
          currentIncident={selectedIncident}
          patients={patients}
          onSubmit={handleSubmitIncident}
          onCancel={closeModals}
        />
      )}

      {isDetailsModalOpen && (
        <IncidentDetailsModal
          incident={selectedIncident}
          patients={patients}
          onClose={closeModals}
        />
      )}
    </div>
  );
};

export default IncidentsPage;