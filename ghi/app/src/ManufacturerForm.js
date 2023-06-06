import React, { useEffect, useState } from "react";


function ManufacturerForm() {
    const [manufacturer, setManufacturer] = useState('');

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}

        data.name = manufacturer;

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            setManufacturer('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <h1>Create a new manufacturer</h1>
                <form onSubmit={handleSubmit} id="create-manufacturer-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer Name" required type="text" id="manufacturer" className="form-control" />
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    );

}

export default ManufacturerForm;
