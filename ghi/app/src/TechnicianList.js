import React, { useEffect, useState } from "react";

export default function TechnicianList() {
    const[technicians, setTechnician] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');
        const data = await response.json();
        setTechnician(data.technicians)

    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <h1>Technicians</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map(technician => {
                        return (
                            <tr key={technician.id}>
                                <td>{technician.employee_id}</td>
                                <td>{technician.first_name}</td>
                                <td>{technician.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
