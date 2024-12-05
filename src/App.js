
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAppointment from './AddAppointment';
import AppointmentList from './AppointmentList';
import './App.css';

const App = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Add new appointment
  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  // Delete appointment
  const deleteAppointment = (id) => {
    axios
        .delete(`http://localhost:8080/api/appointments/${id}`)
        .then(() => {
          setAppointments(appointments.filter((apt) => apt.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting appointment:', error);
        });
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Barber Shop Appointments</h1>
        </header>
        <AddAppointment onAddAppointment={addAppointment} />
        <AppointmentList appointments={appointments} onDeleteAppointment={deleteAppointment} />
      </div>
  );
};

export default App;
