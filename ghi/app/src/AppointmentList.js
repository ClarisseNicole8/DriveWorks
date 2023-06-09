import React, { useEffect, useState } from "react";

export default function AppointmentList(props) {
    const[appointments, setAppointments] = useState([]);
    console.log(props);
    function updateVip(appointment) {
        for (let auto of props) {
            if (auto.vin === appointment.vin) {
                return true;
            }
        }
        return false;
    };

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        const data = await response.json();
        setAppointments(data.appointments)
    }

    const handleFinishChange = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
            method: 'put',
        });
    }

    const handleCancelChange = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
            method: 'put',
        });
    }



    useEffect(() => {
        fetchData()
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
                                <td>{updateVip(appointment) ? "yes" : "no"}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td><button type="button"
                                    className='btn btn-success options-outlined'
                                    onClick={() => handleFinishChange(appointment.id)}>Finish</button></td>
                                <td><button type="button"
                                    className='btn btn-danger options-outlined'
                                    onClick={() => handleCancelChange(appointment.id)}>Cancel</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
