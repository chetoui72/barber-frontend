import React from 'react';
import AppointmentItem from './AppointmentItem';

const AppointmentList = ({ appointments, onDeleteAppointment }) => {
    return (
        <div className="appointment-list">
            <h2>Appointment List</h2>
            <ul className="appointments">
                {appointments.map((appointment) => (
                    <AppointmentItem
                        key={appointment.id}
                        appointment={appointment}
                        onDeleteAppointment={onDeleteAppointment}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
