import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import VehicleModelsList from './VehicleModelsList';

// inventory
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import VehicleModelForm from './VehicleModelForm';


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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
