import React from 'react';

const AppointmentItem = ({ appointment, onDeleteAppointment }) => {
    const { id, customerName, serviceType, appointmentTime, status } = appointment;

    return (
        <li className="appointment-item">
            <h3 className="appointment-name">{customerName}</h3>
            <p className="appointment-service">Service: {serviceType}</p>
            <p className="appointment-time">Time: {new Date(appointmentTime).toLocaleString()}</p>
            <p className="appointment-status">Status: {status || "Not set"}</p> {/* Display status, default to "Not set" if null */}
            <button onClick={() => onDeleteAppointment(id)} className="delete-button">Delete</button>
        </li>
    );
};

export default AppointmentItem;
