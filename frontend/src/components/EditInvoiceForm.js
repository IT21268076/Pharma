// src/components/EditInvoiceForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditInvoiceForm.css';

const EditInvoiceForm = () => {
  const [invoiceName, setInvoiceName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [billingType, setBillingType] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const navigate = useNavigate();
  const { invoiceId } = useParams();

  useEffect(() => {
    // Fetch the invoice data for editing
    axios.get(`http://localhost:8090/api/invoices/${invoiceId}`)
      .then(response => {
        const invoice = response.data;
        setInvoiceName(invoice.name);
        setMobileNo(invoice.mobile_no);
        setEmail(invoice.email);
        setAddress(invoice.address);
        setBillingType(invoice.billing_type);
        setItemCount(invoice.itemCount);
        setTotalAmount(invoice.totalAmount);
      })
      .catch(error => console.error('Error fetching invoice for editing:', error));
  }, [invoiceId]);

  const handleUpdateInvoice = () => {
    // Send a PUT request to update the invoice
    axios.put(`http://localhost:8090/api/invoices/${invoiceId}`, {
      name: invoiceName,
      mobile_no: mobileNo,
      email: email,
      address: address,
      billing_type: billingType,
      item_count: itemCount,
      total_amount: totalAmount,
    })
    .then(response => {
      console.log('Invoice updated successfully:', response.data);
      // Navigate back to the invoice list after successful update
      navigate('/invoices');
    })
    .catch(error => console.error('Error updating invoice:', error));
  };

  return (
    <div className="edit-container">
      <h2>Edit Invoice</h2>
      {/* Invoice Name */}
      <label htmlFor="invoiceName">Name:</label>
      <input
        type="text"
        id="invoiceName"
        value={invoiceName}
        onChange={(e) => setInvoiceName(e.target.value)}
      />

      {/* Mobile Number */}
      <label htmlFor="mobileNo">Mobile No:</label>
      <input
        type="text"
        id="mobileNo"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
      />

      {/* Email */}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Address */}
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Billing Type */}
      <label htmlFor="billingType">Billing Type:</label>
      <input
        type="text"
        id="billingType"
        value={billingType}
        onChange={(e) => setBillingType(e.target.value)}
      />

      {/* item count */}
      <label htmlFor="itemCount">Item COunt:</label>
      <input
        type="number"
        id="itemCount"
        value={itemCount}
        onChange={(e) => setItemCount(e.target.value)}
      />

      {/* total amount */}
      <label htmlFor="totalAmount">Total Amount:</label>
      <input
        type="number"
        id="totalAmount"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
      />

      {/* Button to Update Invoice */}
      <button onClick={handleUpdateInvoice}>Update Invoice</button>
    </div>
  );
};

export default EditInvoiceForm;
