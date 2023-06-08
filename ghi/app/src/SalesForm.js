import React, { useEffect, useState } from 'react';


function SalesForm() {

    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSaleperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSaleperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}

        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;

        console.log(data);

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            setAutomobile('');
            setSaleperson('');
            setCustomer('');
            setPrice('');
        }
    }

    const fetchData = async () => {
        const AutomobileResponse = await fetch('http://localhost:8100/api/automobiles/');
        const SalespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
        const CustomerResponse = await fetch('http://localhost:8090/api/customers/');
        if (AutomobileResponse.ok && SalespeopleResponse.ok && CustomerResponse.ok) {
            const autodata = await AutomobileResponse.json();
            const salesdata = await SalespeopleResponse.json();
            const customdata = await CustomerResponse.json();

            setAutomobiles(autodata.automobiles);
            setSalespeople(salesdata.salespeople);
            setCustomers(customdata.customers);

        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="form-floating mb-3">
                            <input onChange={handlePriceChange} placeholder="Price" required type="number" name="price" id="price" className="form-control" value={price} />
                            <label htmlFor="price">Price</label>
                        </div>
                        {/* <div className="mb-3">
                            <select onChange={handleAutomobileChange} required name="automobile" id="automobile" className="form-select" value={automobile}>
                                <option value="">Select an automobile</option>
                                {automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.id} value={automobile.vin}>
                                            {automobile.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div> */}
                        <div className="mb-3">
                            <select onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select" value={salesperson}>
                                <option value="">Select a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleCustomerChange} required name="customer" id="customer" className="form-select" value={customer}>
                                <option value="">Select a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Add Sale</button>
                    </form>
                </div>
            </div>
        </div>
    );


}


export default SalesForm;
