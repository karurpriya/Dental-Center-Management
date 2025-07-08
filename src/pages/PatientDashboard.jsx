// src/pages/PatientDashboard.jsx - CORRECTED
import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const PatientDashboard = () => {
  // CORRECTED: Use 'user' from useAuth, not 'currentUser'
  const { user } = useAuth();
  const { patients, incidents } = useData();

  const currentPatient = useMemo(() => {
    // CORRECTED: Check 'user' and 'user.patientId'
    if (!user || !user.patientId) {
      console.warn("User or user.patientId is missing for PatientDashboard.");
      // Added a console log to help debug which part is missing
      console.log("User object:", user);
      console.log("User patientId:", user?.patientId);
      return null;
    }
    // CORRECTED: Find patient using 'user.patientId'
    return patients.find(patient => patient.id === user.patientId);
  }, [patients, user]); // Depend on patients and user (NOT currentUser)

  const patientIncidents = useMemo(() => {
    if (!currentPatient) return [];
    return incidents.filter(incident => incident.patientId === currentPatient.id);
  }, [incidents, currentPatient]);

  // Memoize the 'now' date to avoid re-rendering warnings for useMemo dependencies
  const memoizedNow = useMemo(() => new Date(), []);

  const upcomingAppointments = useMemo(() => {
    return patientIncidents
      .filter(inc => new Date(inc.appointmentDate) >= memoizedNow && inc.status === 'Scheduled')
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  }, [patientIncidents, memoizedNow]);

  const pastVisits = useMemo(() => {
    return patientIncidents
      .filter(inc => new Date(inc.appointmentDate) < memoizedNow || inc.status === 'Completed')
      .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)); // Sort by most recent first
  }, [patientIncidents, memoizedNow]);


  if (!currentPatient) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-160px)] flex items-center justify-center">
        <p className="text-xl text-gray-700">Patient profile not found. Please ensure your user account is correctly linked to a patient record.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-[calc(100vh-160px)]">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {currentPatient.name}!</h2>

      {/* Patient Information Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-medium">Email:</span> {currentPatient.email}</p>
          <p><span className="font-medium">Phone:</span> {currentPatient.contact || 'N/A'}</p> {/* Use 'contact' as per DEFAULT_PATIENTS */}
          <p><span className="font-medium">Date of Birth:</span> {currentPatient.dob ? new Date(currentPatient.dob).toLocaleDateString() : 'N/A'}</p>
          <p><span className="font-medium">Address:</span> {currentPatient.address || 'N/A'}</p>
        </div>
      </div>

      {/* My Upcoming Appointments Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">My Upcoming Appointments</h3>
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-600">You have no upcoming appointments scheduled.</p>
        ) : (
          <ul className="space-y-4">
            {upcomingAppointments.map(incident => (
              <li key={incident.id} className="p-4 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition duration-150 ease-in-out">
                <p className="text-lg font-semibold text-blue-800">{incident.title}</p>
                <p className="text-gray-700">
                  <span className="font-medium">Date & Time:</span> {new Date(incident.appointmentDate).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-1">{incident.description}</p>
                {/* ADDED: Display Comments if available */}
                {incident.comments && <p className="text-gray-600 text-sm mt-1"><span className="font-medium">Comments:</span> {incident.comments}</p>}
                {/* ADDED: Display Next Date if available */}
                {incident.nextDate && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Next Appointment:</span> {new Date(incident.nextDate).toLocaleDateString()}
                  </p>
                )}
                <p className={`text-sm font-medium ${incident.status === 'Scheduled' ? 'text-yellow-600' : 'text-gray-500'}`}>Status: {incident.status}</p>
                {/* ADDED: Display Files if available */}
                {incident.files && incident.files.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium text-gray-700 text-sm">Attachments:</p>
                    <ul className="list-disc list-inside text-sm text-blue-700">
                      {incident.files.map((file, fileIndex) => (
                        <li key={fileIndex}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* My Past Visits History Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">My Past Visits History</h3>
        {pastVisits.length === 0 ? (
          <p className="text-gray-600">You have no past visit records.</p>
        ) : (
          <ul className="space-y-4">
            {pastVisits.map(incident => (
              <li key={incident.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out">
                <p className="text-lg font-semibold text-gray-800">{incident.title}</p>
                <p className="text-gray-700">
                  <span className="font-medium">Date & Time:</span> {new Date(incident.appointmentDate).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-1">{incident.description}</p>
                {/* ADDED: Display Comments if available */}
                {incident.comments && <p className="text-gray-600 text-sm mt-1"><span className="font-medium">Comments:</span> {incident.comments}</p>}
                {/* ADDED: Display Cost if available */}
                {incident.cost != null && <p className="text-gray-700 text-sm mt-1"><span className="font-medium">Cost:</span> ${incident.cost.toFixed(2)}</p>}
                {/* ADDED: Display Treatment if available */}
                {incident.treatment && <p className="text-gray-700 text-sm mt-1"><span className="font-medium">Treatment:</span> {incident.treatment}</p>}
                {/* ADDED: Display Next Date if available */}
                {incident.nextDate && (
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium">Next Appointment:</span> {new Date(incident.nextDate).toLocaleDateString()}
                  </p>
                )}
                <p className={`text-sm font-medium ${incident.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>Status: {incident.status}</p>
                {/* ADDED: Display Files if available */}
                {incident.files && incident.files.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium text-gray-700 text-sm">Attachments:</p>
                    <ul className="list-disc list-inside text-sm text-blue-700">
                      {incident.files.map((file, fileIndex) => (
                        <li key={fileIndex}>
                          <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {file.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;