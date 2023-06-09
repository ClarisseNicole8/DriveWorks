import React, { useEffect, useState } from "react";

export default function VehicleModelForm() {
    const[name, setName] = useState('');
    const[picture_url, setPictureUrl] = useState('');
    const[manufacturer_id, setManufacturer] = useState('');
    const[manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const getManufacturerData = async () => {
            const response = await fetch('http://localhost:8100/api/manufacturers/');
            const data = await response.json();
            setManufacturers(data.manufacturers);
        };

        getManufacturerData();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            picture_url,
            manufacturer_id
        };

        const modelsUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(modelsUrl, fetchConfig);

        if (response.ok) {
            setName('');
            setPictureUrl('');
            setManufacturer('');
        }
      };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value)
    }
    const handlePictureUrlChange = (e) => {
        const value = e.target.value;
        setPictureUrl(value)
    }
    const handleManufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturer(value)
    }


    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a vehicle model</h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={name} placeholder="Model name" required type="text" name="name" id="name" className="form-control"/>
                    <label htmlFor="name">Model name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePictureUrlChange} value={picture_url} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                    <label htmlFor="picture_url">Picture URL</label>
                </div>
                <div className="mb-3">
                    <select required onChange={handleManufacturerChange} name="manufacturer" id="manufacturer" className="form-select" value={manufacturer_id} >
                        <option value="">Choose a manufacturer</option>
                        {manufacturers.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                                );
                            })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>

        )

    }
