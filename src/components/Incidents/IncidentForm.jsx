// src/components/Incidents/IncidentForm.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS (ensure this is globally available or imported here)

const IncidentForm = ({ currentIncident, patients, onSubmit, onCancel }) => {
  const [patientId, setPatientId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date()); // Initialize with Date object
  const [cost, setCost] = useState('');
  const [treatment, setTreatment] = useState('');
  const [status, setStatus] = useState('Scheduled');
  const [nextDate, setNextDate] = useState(null); // Initialize with null for optional date
  const [files, setFiles] = useState([]); // State for attached files
  const [selectedFile, setSelectedFile] = useState(null); // State for file chosen for upload

  useEffect(() => {
    if (currentIncident) {
      // Populate form if editing an existing incident
      setPatientId(currentIncident.patientId || '');
      setTitle(currentIncident.title || '');
      setDescription(currentIncident.description || '');
      setComments(currentIncident.comments || '');
      // Convert ISO string to Date object for DatePicker
      setAppointmentDate(currentIncident.appointmentDate ? new Date(currentIncident.appointmentDate) : new Date());
      setCost(currentIncident.cost || '');
      setTreatment(currentIncident.treatment || '');
      setStatus(currentIncident.status || 'Scheduled');
      // Convert ISO string to Date object for DatePicker
      setNextDate(currentIncident.nextDate ? new Date(currentIncident.nextDate) : null);
      setFiles(currentIncident.files || []); // Populate existing files
    } else {
      // Clear form if adding a new incident
      setPatientId('');
      setTitle('');
      setDescription('');
      setComments('');
      setAppointmentDate(new Date()); // Default to current date for new incident
      setCost('');
      setTreatment('');
      setStatus('Scheduled');
      setNextDate(null);
      setFiles([]);
    }
    setSelectedFile(null); // Clear selected file on modal open/close
  }, [currentIncident]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newFile = {
            name: selectedFile.name,
            url: reader.result, // Base64 string
            type: selectedFile.type, // Store MIME type
          };
          setFiles(prevFiles => [...prevFiles, newFile]); // Add to files array
          setSelectedFile(null); // Clear selected file after adding
          resolve();
        };
        reader.readAsDataURL(selectedFile); // Reads file as Base64 data URL
      });
    }
    return Promise.resolve(); // If no file selected, resolve immediately
  };

  const handleFileRemove = (indexToRemove) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure any newly selected file is processed before submission
    await handleFileUpload();

    // Use the latest state for files after potential upload
    // Note: This pattern might require a slight re-render or a ref to ensure
    // `files` state is fully updated before `onSubmit` is called if `handleFileUpload`
    // causes a state update that isn't immediately reflected in `files` for `incidentData`.
    // For simplicity, we'll assume `files` is updated synchronously enough here.
    // A more robust solution might involve passing the file directly to onSubmit
    // or managing files outside this component if it gets too complex.

    const incidentData = {
      id: currentIncident?.id,
      patientId,
      title,
      description,
      comments,
      // Convert Date objects to ISO string for storage
      appointmentDate: appointmentDate ? appointmentDate.toISOString() : null,
      cost: cost ? parseFloat(cost) : null,
      treatment,
      status,
      // Convert Date object to ISO string for storage, or null
      nextDate: nextDate ? nextDate.toISOString() : null,
      files // Include the files array
    };
    onSubmit(incidentData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {currentIncident ? 'Edit Incident' : 'Add New Incident'}
      </h3>

      <div>
        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient</label>
        <select
          id="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={!!currentIncident}
        >
          <option value="">Select a Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows="2"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      {/* DatePicker for Appointment Date & Time */}
      <div>
        <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date & Time</label>
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Fields that are typically filled after an appointment (conditionally rendered) */}
      {status === 'Completed' && (
        <>
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost ($)</label>
            <input
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              step="0.01" // Allow decimal values
            />
          </div>
          <div>
            <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">Treatment</label>
            <textarea
              id="treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          {/* DatePicker for Next Appointment Date */}
          <div>
            <label htmlFor="nextDate" className="block text-sm font-medium text-gray-700">Next Appointment Date (Optional)</label>
            <DatePicker
              selected={nextDate}
              onChange={(date) => setNextDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              isClearable // Allows clearing the date
            />
          </div>

          {/* File Upload Section */}
          <div className="border border-gray-200 p-4 rounded-md bg-white">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile.name}</p>
            )}
            <button
              type="button"
              onClick={handleFileUpload}
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm disabled:opacity-50"
              disabled={!selectedFile}
            >
              Add File to Incident
            </button>

            {files && files.length > 0 && (
              <div className="mt-4">
                <p className="font-medium text-gray-700 text-sm mb-2">Attached Files:</p>
                <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex-grow">
                        {file.name}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleFileRemove(index)}
                        className="ml-2 text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded border border-red-300"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}

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
          {currentIncident ? 'Update Incident' : 'Add Incident'}
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;