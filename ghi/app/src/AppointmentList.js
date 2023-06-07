import React, { useEffect, useState } from "react";

export default function AppointmentList() {
    const[appointments, setAppointments] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        const data = await response.json();
        setAppointments(data.appointments)
    }

    const finishAppointment = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/${id}', {
            method: 'PUT',
        });
        const data = await response.json();
        setAppointments(data.appointments)
    }

    const cancelAppointment = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/${id}', {
            method: 'DELETE',
        });
        const data = await response.json();
        setAppointments(data.appointments)
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <h1>Service Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.status}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td><button type="button"
                                    className='btn btn-success options-outlined'
                                    onClick={() => finishAppointment(appointment.id)}>Finish</button></td>
                                <td><button type="button"
                                    className='btn btn-danger options-outlined'
                                    onClick={() => cancelAppointment(appointment.id)}>Cancel</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
