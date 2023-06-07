import React, { useEffect, useState } from "react";

function SalesList () {
    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sales/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Automobile VIN</th>
                        <th>Employee ID</th>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => {
                        return (
                            <tr key={sale.automobile.vin}>
                                <td>{ sale.automobile.vin }</td>
                                <td>{ sale.salesperson.employee_id }</td>
                                <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                                <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                                <td>{ sale.price }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;
