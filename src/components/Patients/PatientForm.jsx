// src/components/Patients/PatientForm.jsx
import React, { useState, useEffect } from 'react';

const PatientForm = ({ currentPatient, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // New field for patient email (for login)
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [healthInfo, setHealthInfo] = useState('');

  useEffect(() => {
    if (currentPatient) {
      // Populate form if editing an existing patient
      setName(currentPatient.name || '');
      setEmail(currentPatient.email || '');
      setDob(currentPatient.dob || '');
      setContact(currentPatient.contact || '');
      setHealthInfo(currentPatient.healthInfo || '');
    } else {
      // Clear form if adding a new patient
      setName('');
      setEmail('');
      setDob('');
      setContact('');
      setHealthInfo('');
    }
  }, [currentPatient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: currentPatient?.id, name, email, dob, contact, healthInfo });
    // Form will be cleared/closed by parent component after onSubmit
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {currentPatient ? 'Edit Patient' : 'Add New Patient'}
      </h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (for Patient Portal login)</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="tel" // Use type="tel" for phone numbers
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="healthInfo" className="block text-sm font-medium text-gray-700">Health Information / Notes</label>
        <textarea
          id="healthInfo"
          value={healthInfo}
          onChange={(e) => setHealthInfo(e.target.value)}
          rows="3"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {currentPatient ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;