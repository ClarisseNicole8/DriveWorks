import React, { useEffect, useState } from "react";

export default function AppointmentForm() {
    const[date, setDate] = useState('');
    const[time, setTime] = useState('');
    const[reason, setReason] = useState('');
    const[vin, setVin] = useState('');
    const[customer, setCustomer] = useState('');
    const[technician, setTechnician] = useState('');
    const[technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/api/technicians');
            const data = await response.json();
            setTechnicians(data.technicians);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            date,
            time,
            reason,
            vin,
            customer,
            technician,
        };

    const appointmentUrl = 'http://localhost:8080/api/appointments/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
    const response = await fetch(appointmentUrl, fetchConfig);

    if (response.ok) {
        setDate('');
        setTime('');
        setReason('');
        setVin('');
        setCustomer('');
        setTechnician('');
    }
    };


    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value)
    }
    const handleTimeChange = (e) => {
        const value = e.target.value;
        setTime(value)
    }
    const handleReasonChange = (e) => {
        const value = e.target.value;
        setReason(value)
    }
    const handleVinChange = (e) => {
        const value = e.target.value;
        setVin(value)
    }
    const handleCustomerChange = (e) => {
        const value = e.target.value;
        setCustomer(value)
    }
    const handleTechnicianChange = (e) => {
        const value = e.target.value;
        setTechnician(value)
    }


    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a service appointment</h1>
                <form onSubmit={handleSubmit} id="create-appointment-form">
                <div className="form-floating mb-3">
                    <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                    <label htmlFor="vin">Automobile VIN</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleCustomerChange} value={customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control"/>
                    <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleDateChange} value={date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                    <label htmlFor="date">Date</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleTimeChange} value={time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
                    <label htmlFor="time">Time</label>
                </div>
                <div className="mb-3">
                    <select required onChange={handleTechnicianChange} name="technician" id="technician" className="form-select" value={technician} >
                        <option value="">Choose a technician</option>
                        {technicians.map(technician => {
                            return (
                                <option key={technician.employee_id} value={technician.employee_id}>
                                    {technician.first_name} {technician.last_name}
                                </option>
                                );
                            })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="reason">Reason</label>
                    <textarea onChange={handleReasonChange} value={reason} id="reason" rows="3" name="reason" className="form-control"></textarea>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>

        )

    }
