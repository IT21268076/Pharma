// src/components/AddInvoiceForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddInvoiceForm.css'; 
const AddInvoiceForm = () => {
  const [invoiceName, setInvoiceName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [billingType, setBillingType] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const navigate = useNavigate();

  const handleAddInvoice = () => {
    // Send a POST request to add a new invoice
    axios
      .post('http://localhost:8090/api/invoices', {
        name: invoiceName,
        mobile_no: mobileNo,
        email: email,
        address: address,
        billing_type: billingType,
        item_count: itemCount,
        total_amount: totalAmount,
      })
      .then((response) => {
        console.log('Invoice added successfully:', response.data);
        // Navigate back to the invoice list after successful addition
        navigate('/invoices');
      })
      .catch((error) => console.error('Error adding invoice:', error));
  };

  return (
    <div className="add-invoice-container">
      <h2>Add New Invoice</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={invoiceName} onChange={(e) => setInvoiceName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Mobile No:</label>
        <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Billing Type:</label>
        <input type="text" value={billingType} onChange={(e) => setBillingType(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Item count:</label>
        <input type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Total Amount:</label>
        <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
      </div>
      <button className="add-invoice-button" onClick={handleAddInvoice}>
        Add Invoice
      </button>
    </div>
  );
};

export default AddInvoiceForm;
