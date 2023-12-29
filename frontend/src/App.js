// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ItemList from './components/ItemList';
import InvoiceList from './components/InvoiceList';
import AddItemForm from './components/AddItemForm';
import AddInvoiceForm from './components/AddInvoiceForm';
import EditItemForm from './components/EditItemForm';
import EditInvoiceForm from './components/EditInvoiceForm';
import Navbar from './components/Navbar';
import './App.css'; 

const Home = () => (
  <div className='main'>
    <Navbar />
    <h1 className="main-title">Welcome to ABC Pharmacy</h1>
    <div className="buttons-container-m">
      <Link to="/items" className="nav-link">
        <button className="nav-button">Items</button>
      </Link>
      <Link to="/invoices" className="nav-link">
        <button className="nav-button">Invoices</button>
      </Link>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/add" element={<AddItemForm />} />
        <Route path="/items/:itemId" element={<EditItemForm />} />
        
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/add" element={<AddInvoiceForm />} />
        <Route path="/invoices/:invoiceId" element={<EditInvoiceForm />} />
      </Routes>
    </Router>
  );
};

export default App;
