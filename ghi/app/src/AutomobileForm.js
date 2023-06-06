import React, { useEffect, useState } from "react";

export default function AutomobileForm() {
    const[color, setColor] = useState('');
    const[year, setYear] = useState('');
    const[vin, setVin] = useState('');
    const[model_id, setModel] = useState('');
    const[models, setModels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8100/api/models/');
            const data = await response.json();
            setModels(data.models);
        };

        fetchData();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            color,
            year,
            vin,
            model_id,
        };

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(automobileUrl, fetchConfig);

        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
      };

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value)
    }
    const handleYearChange = (e) => {
        const value = e.target.value;
        setYear(value)
    }
    const handleVinChange = (e) => {
        const value = e.target.value;
        setVin(value)
    }
    const handleModelChange = (e) => {
        const value = e.target.value;
        setModel(value)
    }


    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add an automobile to the inventory</h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                    <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleYearChange} value={year} placeholder="Year" required type="text" name="year" id="year" className="form-control"/>
                    <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                    <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                    <select required onChange={handleModelChange} name="bin" id="bin" className="form-select" value={model_id} >
                        <option value="">Choose a model</option>
                        {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.manufacturer.name} {model.name}
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
