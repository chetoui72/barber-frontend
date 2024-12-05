import React, { useState } from 'react';
import axios from 'axios';

const AddAppointment = ({ onAddAppointment }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        serviceType: '',
        appointmentTime: '',
        status: 'booked', // Default status
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { customerName, serviceType, appointmentTime, status } = formData;

        try {
            const response = await axios.post('http://localhost:8080/api/appointments', {
                customerName,
                serviceType,
                appointmentTime,
                status,
            });

            onAddAppointment(response.data);
            setFormData({ customerName: '', serviceType: '', appointmentTime: '', status: 'booked' });
        } catch (error) {
            console.error('Error creating appointment:', error);


            if (error.response) {

                const messages = [];
                if (error.response.data) {

                    if (typeof error.response.data === 'object') {
                        for (const key in error.response.data) {
                            if (error.response.data.hasOwnProperty(key)) {
                                messages.push(`${key}: ${error.response.data[key]}`);
                            }
                        }
                    } else {
                        messages.push(error.response.data);
                    }
                }
                setError(`Error ${error.response.status}: ${messages.join(', ') || 'Failed to create appointment.'}`);
            } else if (error.request) {

                setError('No response from server. Please try again later.');
            } else {

                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="add-appointment">
            <h2>Add Appointment</h2>
            <form onSubmit={handleSubmit} className="appointment-form">
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Customer Name"
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    placeholder="Service Type"
                    required
                    className="form-input"
                />
                <input
                    type="datetime-local"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                >
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Adding...' : 'Add Appointment'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Display detailed error */}
        </div>
    );
};

export default AddAppointment;
