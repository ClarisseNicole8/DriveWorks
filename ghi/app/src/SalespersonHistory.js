import React, { useEffect, useState } from "react";


function SalespersonHistory() {
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);
    const [saleperson, setSaleperson] = useState('');


    const handleSalespersonChange = (event) => {
        setSaleperson(event.target.value);
    };

    const fetchSalespeople = async () => {
        const SalespeopleResponse 
    }
}


export default SalespersonHistory;
