// src/pages/PatientsPage.jsx
import React, { useState } from 'react'; // Ensure no unused imports
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import PatientForm from '../components/Patients/PatientForm'; // The form for add/edit
import { FaEdit, FaTrash } from 'react-icons/fa'; // Ensure icons are imported if used

const PatientsPage = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useData();
  const { register } = useAuth(); // Destructure register from useAuth

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const openAddPatientModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const openEditPatientModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSubmitPatient = (patientData) => {
    if (patientData.id) {
      // Existing patient, just update patient data
      updatePatient(patientData);
    } else {
      // New patient
      // 1. Add the patient data to DataContext, and get the new patient's ID back
      const newPatientId = addPatient(patientData);
      console.log('New patient added with ID:', newPatientId);

      // 2. Register a new user for this patient in AuthContext
      if (newPatientId) { // Only register user if patient data was successfully added
        const success = register({
          email: patientData.email,
          password: 'patient123', // Default password for new patients
          role: 'Patient',
          patientId: newPatientId, // Link user to the patient data using the new ID
        });

        if (!success) {
          alert('Could not create user for patient. Email might already be registered.');
        }
      } else {
        alert('Failed to add patient data.');
      }
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-160px)]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Patient Management</h2>

      <div className="mb-6 text-right">
        <button
          onClick={openAddPatientModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Add New Patient
        </button>
      </div>

      {patients.length === 0 ? (
        <p className="text-gray-600 text-center">No patients found. Click "Add New Patient" to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Date of Birth</th>
                <th className="py-3 px-6 text-left">Contact</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{patient.name}</td>
                  <td className="py-3 px-6 text-left">{patient.email}</td>
                  <td className="py-3 px-6 text-left">{patient.dob}</td>
                  <td className="py-3 px-6 text-left">{patient.contact}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-3">
                      <button
                        onClick={() => openEditPatientModal(patient)}
                        className="w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600 flex items-center justify-center transition duration-200"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition duration-200"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <PatientForm
          currentPatient={selectedPatient}
          onSubmit={handleSubmitPatient}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default PatientsPage;