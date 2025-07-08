// src/pages/CalendarPage.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useData } from '../contexts/DataContext'; // To get incidents

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { incidents, patients } = useData();

  // State to manage the calendar view (month, week, day, agenda)
  const [view, setView] = useState('month');
  // State to manage the current date displayed by the calendar
  const [date, setDate] = useState(new Date());

  // Function to get patient name for an incident
  const getPatientName = useCallback((patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  }, [patients]);

  // Transform incidents data into calendar events format
  // Use useMemo to re-calculate events only when incidents or patients change
  const events = useMemo(() => {
    return incidents
      .filter(inc => inc.appointmentDate && inc.status === 'Scheduled') // Only show scheduled appointments
      .map(inc => ({
        id: inc.id,
        title: `${inc.title} - ${getPatientName(inc.patientId)}`, // Event title includes patient name
        start: new Date(inc.appointmentDate), // Calendar event start time
        end: new Date(inc.appointmentDate), // For appointments, start and end are often the same
        allDay: false, // Set to true if it's an all-day event
        resource: inc, // You can store the full incident object here if needed for details
      }));
  }, [incidents, getPatientName]);

  // Optional: Handle event clicks (e.g., to open a modal with incident details)
  const handleSelectEvent = useCallback((event) => {
    alert(`Event: ${event.title}\nDate: ${event.start.toLocaleString()}`);
    // In a real app, you would open a modal with event.resource (the full incident object)
  }, []);

  const handleNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const handleViewChange = useCallback((newView) => setView(newView), [setView]);


  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-[calc(100vh-160px)]"> {/* Adjust height as needed */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Appointment Calendar</h2>

      <div className="h-full"> {/* Calendar needs a defined height */}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title" // The key in event object to use for event title
          style={{ height: '100%' }} // Ensure the calendar fills its container
          onSelectEvent={handleSelectEvent} // Handle clicks on events
          onNavigate={handleNavigate} // Handle navigation (prev/next month/week)
          onView={handleViewChange} // Handle view changes (month/week/day/agenda)
          view={view} // Current view
          date={date} // Current date for the calendar
          popup // Enable popup for events (shows more details on hover or click, depending on setup)
          views={['month', 'week', 'day', 'agenda']} // Available views
          defaultView="month" // Starting view
          // Event styles (optional, can be done via CSS too)
          eventPropGetter={(event, start, end, isSelected) => ({
            className: 'bg-blue-600', // Apply Tailwind blue background
            style: {
              backgroundColor: '#3b82f6', // Ensure background color
              borderRadius: '4px',
              color: 'white',
              border: 'none',
              fontSize: '0.875rem',
              padding: '2px 5px',
            },
          })}
        />
      </div>
    </div>
  );
};

export default CalendarPage;