import React, { useEffect, useState } from "react";

export default function AppointmentList() {
    const[appointments, setAppointments] = useState([]);
    // const[automobiles, setAutomobiles] = useState([]);

    // const handleFinishChange = async(id) => {
    //     const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`,
    //         {'method': 'PUT'});
    //     if (response.ok){
    //         setAppointments('');
    //     }
    // }

    // const handleCancelChange = async(id) => {
    //     const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`,
    //         {'method': 'PUT'});
    //     if (response.ok){
    //         setAppointments('');
    //     }
    // }

    // const fetchData = async() => {
    //     const appointmentResponse = await fetch('http://localhost:8080/api/appointments/');

    //     if (appointmentResponse.ok) {
    //         const data = await appointmentResponse.json();
    //         setAppointments(data.appointments);

    //     }

    //     const automobileResponse = await fetch('http://localhost:8080/api/automobileVOs/');

    //     if (automobileResponse.ok) {
    //         const automobileData = await automobileResponse.json();
    //         setAutomobiles(automobileData.AutomobileVOs);
    //     }
    // }


    // useEffect(
    //     () => {
    //         fetchData();
    //     }, []
    // )
    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointment);
        }
    };

    const handleFinishChange = async (e, id) => {
        e.preventDefault();
        const finishUrl = 'http://localhost:8080/api/appointments/${id}/finish/';
        const fetchConfig = {
            method: 'put'
        };
        const finishResponse = await fetch(finishUrl, fetchConfig);
        if (finishResponse.ok) {
            setAppointments('');
        }
    };

    const handleCancelChange = async (e, id) => {
        e.preventDefault();
        const cancelUrl = 'http://localhost:8080/api/appointments/${id}/cancel/';
        const fetchConfig = {
            method: 'put'
        };
        const cancelResponse = await fetch(cancelUrl, fetchConfig);
        if (cancelResponse.ok) {
            setAppointments('');
        }
    };

    useEffect(() => {
            fetchData();
        }, []
    )


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
                    {appointments?.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip ? "Yes":"No"}</td>
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
