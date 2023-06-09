import React, { useEffect, useState } from "react";

function SalesList () {
    const [sales, setSales] = useState([]);
    const [autos, setAutos] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sales/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log("data", data)
            setSales(data.auto)
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
                    {autos.map(auto => {
                        return (
                            <tr key={auto.vin}>
                                <td>{ auto.vin }</td>
                                {/* <td>{ auto.sale.salesperson.employee_id }</td>
                                <td>{ auto.sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                                <td>{ auto.sale.customer.first_name } { sale.customer.last_name }</td>
                                <td>{ auto.sale.price }</td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalesList;
