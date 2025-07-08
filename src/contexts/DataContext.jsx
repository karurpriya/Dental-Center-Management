// src/contexts/DataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuid is imported

const DataContext = createContext();

// Make sure your DEFAULT_PATIENTS and DEFAULT_INCIDENTS are correct here
// (ensure no duplicate 'status' keys in incidents, as you just fixed)
const DEFAULT_PATIENTS = [
  { id: 'p1', name: 'John Doe', dob: '1990-05-10', contact: '1234567890', email: 'john@entnt.in', healthInfo: 'No allergies, regular dental check-ups.' },
  { id: 'p2', name: 'Raj', dob: '1985-11-20', contact: '0987654321', email: 'raj@gmail.com', healthInfo: 'History of wisdom teeth issues.' },
  { id: 'p3', name: 'Tej', dob: '2000-01-01', contact: '1122334455', email: 'tej@entnt.in', healthInfo: 'Sensitive teeth, prone to cavities.' },
];

const DEFAULT_INCIDENTS = [
  {
    id: 'inc1',
    patientId: 'p1',
    title: 'Toothache Assessment',
    description: 'Patient complained of sharp pain in lower right molar.',
    comments: 'Recommended X-ray and possible filling for tooth #30.',
    appointmentDate: new Date('2025-07-15T14:30:00').toISOString(),
    status: 'Scheduled',
    cost: null,
    treatment: null,
    nextDate: null,
    files: []
  },
  {
    id: 'inc2',
    patientId: 'p2',
    title: 'Wisdom Tooth Consultation',
    description: 'Patient discussing options for wisdom tooth removal.',
    comments: 'Reviewed panoramic X-ray. Discussed surgical and recovery process.',
    appointmentDate: new Date('2025-07-06T10:00:00').toISOString(),
    status: 'Scheduled',
    cost: null,
    treatment: null,
    nextDate: null,
    files: []
  },
  {
    id: 'inc3',
    patientId: 'p1',
    title: 'Initial Dental Check-up',
    description: 'Comprehensive dental examination including cleaning.',
    comments: 'Healthy gums, no major issues found. Advised on flossing technique.',
    appointmentDate: new Date('2025-07-01T10:00:00').toISOString(),
    status: 'Completed',
    cost: 150,
    treatment: 'Full dental cleaning',
    nextDate: new Date('2026-01-01T10:00:00').toISOString(), // Next 6-month cleaning
    files: []
  },
  {
    id: 'inc4',
    patientId: 'p3',
    title: 'Composite Filling (Tooth #14)',
    description: 'Cavity filling completed on upper left molar.',
    comments: 'Patient handled procedure well, advised on aftercare and sensitivity.',
    appointmentDate: new Date('2024-11-20T11:00:00').toISOString(),
    status: 'Completed',
    cost: 200,
    treatment: 'Composite filling on upper left molar #14',
    nextDate: new Date('2025-05-20T09:00:00').toISOString(),
    files: [
      { id: uuidv4(), name: 'Tej_Invoice_2024_Dental.pdf', url: '#', type: 'application/pdf', size: '150KB' }
    ]
  },
  {
    id: 'inc5',
    patientId: 'p3',
    title: 'Annual Dental Check-up',
    description: 'Annual dental check-up for Tej, including oral cancer screening.',
    comments: 'Routine check-up, no new concerns. Recommended electric toothbrush.',
    appointmentDate: new Date('2025-08-05T09:00:00').toISOString(),
    status: 'Scheduled',
    cost: null,
    treatment: null,
    nextDate: null,
    files: [],
  },
];



export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const localPatients = localStorage.getItem('patients');
    return localPatients ? JSON.parse(localPatients) : DEFAULT_PATIENTS;
  });

  const [incidents, setIncidents] = useState(() => {
    const localIncidents = localStorage.getItem('incidents');
    return localIncidents ? JSON.parse(localIncidents) : DEFAULT_INCIDENTS;
  });

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  }, [incidents]);

  const addPatient = (patient) => {
    const newPatient = { ...patient, id: uuidv4() }; // Generate ID here
    setPatients((prevPatients) => [...prevPatients, newPatient]);
    return newPatient.id; // RETURN THE NEW PATIENT'S ID
  };

  const updatePatient = (updatedPatient) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  const deletePatient = (id) => {
    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    // Also delete incidents related to this patient
    setIncidents((prevIncidents) => prevIncidents.filter((incident) => incident.patientId !== id));
  };

  const addIncident = (incident) => {
    const newIncident = { ...incident, id: uuidv4() };
    setIncidents((prevIncidents) => [...prevIncidents, newIncident]);
  };

  const updateIncident = (updatedIncident) => {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === updatedIncident.id ? updatedIncident : incident
      )
    );
  };

  const deleteIncident = (id) => {
    setIncidents((prevIncidents) => prevIncidents.filter((incident) => incident.id !== id));
  };

  const value = {
    patients,
    incidents,
    addPatient,
    updatePatient,
    deletePatient,
    addIncident,
    updateIncident,
    deleteIncident,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};