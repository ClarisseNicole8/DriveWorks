import React, { useEffect, useState } from 'react';

export default function ServiceHistory() {
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);

  const getData = async () => {
    // Fetch appointments data
    const response = await fetch('http://localhost:8080/api/appointments/');
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);

      for (let appointment of data.appointments) {
        const date = new Date(appointment.date_time).toLocaleDateString();
        appointment["date"] = date;
        const time = new Date(appointment.date_time).toLocaleTimeString();
        appointment["time"] = time;
      }
    }

    // Fetch automobile data
    const automobileResponse = await fetch('http://localhost:8080/api/automobileVOs/');
    if (automobileResponse.ok) {
      const automobileData = await automobileResponse.json();
      setAutomobiles(automobileData.automobileVOs);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchResponse = await fetch('http://localhost:8080/api/appointments/');
    if (searchResponse.ok) {
      const data = await searchResponse.json();

      for (let appointment of data.appointments) {
        const date = new Date(appointment.date_time).toLocaleDateString();
        appointment["date"] = date;
        const time = new Date(appointment.date_time).toLocaleTimeString();
        appointment["time"] = time;
      }

      setAppointments(updatedAppointments => updatedAppointments.filter(appointment => appointment.vin === search));
    }

    const automobileVOResponse = await fetch('http://localhost:8080/api/automobileVOs');
    if (automobileVOResponse.ok) {
      const data = await automobileVOResponse.json();
      setAutomobiles(data.automobileVOs);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  let vins = [];
  if (automobiles) {
    vins = automobiles.map(automobile => automobile.vin);
  }

    return (
        <div>
            <h1>Service History</h1>
                <form className="input-group" onSubmit={handleSearch}>
                    <input className="form-control" id="search" placeholder="Search by VIN..." value={search} onChange={handleSearchChange}></input>
                    <button className="btn btn-primary input-group-append">Search</button>
                </form>
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
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip ? "Yes":"No"}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.employee_id} {appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
