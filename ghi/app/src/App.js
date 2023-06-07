import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
// inventory
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelsList from './VehicleModelsList';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import VehicleModelForm from './VehicleModelForm';
// sales
import SalespersonList from './SalespersonList';
import SalespersonForm from './SalespersonForm';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
// services
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturersList />} />
          <Route path="manufacturers/new/" element={<ManufacturerForm />} />
          <Route path="models" element={<VehicleModelsList />} />
          <Route path="vehiclemodels/new" element={<VehicleModelForm />} />
          <Route path="automobiles/list" element={<AutomobileList />} />
          <Route path="automobiles/new" element={<AutomobileForm />} />
          {/* sales */}
          <Route path="salespeople/" element={<SalespersonList />} />
          <Route path="salespeople/new" element={<SalespersonForm />} />
          <Route path="customers/" element={<CustomerList />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="sales/" element={<SalesList />} />
          {/* services */}
          <Route path="technicians/list" element={<TechnicianList />} />
          <Route path="technicians/new" element={<TechnicianForm />} />
          <Route path="appointments/list" element={<AppointmentList />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
