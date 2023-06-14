import React, { useEffect, useState } from 'react';


function SalespersonHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);
    const [salesperson, setSalesperson] = useState('');

    const handleSalespersonChange = async (event) => {
        const selectedSalesperson = event.target.value;
        setSalesperson(selectedSalesperson);
        const response = await fetch(`http://localhost:8090/api/salesperson/history/${selectedSalesperson}`);
        if (response.ok) {
          const data = await response.json();
          setSales(data.sales);
        }
    }
    const getData = async () => {
        const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
        if (salespeopleResponse.ok) {
            const salespeopleData = await salespeopleResponse.json();
            setSalespeople(salespeopleData.salespeople);

        }
    }
    useEffect(() => {
        getData()
    }, []);

    return (
        <div>
            <h1>Salesperson history</h1>
            <select onChange={handleSalespersonChange} required name="salesperson" label="Salesperson" id="salesperson" className="form-select" value={salesperson}>
                <option value="">Select a Salesperson</option>
                {salespeople.map((salesperson) => {
                    return (
                        <option key={salesperson.id} value={salesperson.id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    );
                })}
            </select>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalespersonHistory;
