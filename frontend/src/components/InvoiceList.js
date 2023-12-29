// src/components/InvoiceList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './InvoiceList.css';
import Navbar from './Navbar'; 

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch invoices from the backend API
    axios.get('http://localhost:8090/api/invoices')
      .then(response => setInvoices(response.data))
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  const handleDeleteInvoice = (invoiceId) => {
    // Send a DELETE request to delete the invoice
    axios.delete(`http://localhost:8090/api/invoices/${invoiceId}`)
      .then(response => {
        // Update the state to reflect the deleted invoice
        setInvoices(prevInvoices => prevInvoices.filter(invoice => invoice.id !== invoiceId));
        console.log('Invoice deleted successfully:', response.data);
      })
      .catch(error => console.error('Error deleting invoice:', error));
  };

  const handleSeePDF = (invoice) => {
    // Generate PDF for the invoice details
    const pdf = new jsPDF();

    // Add a header
    pdf.text(`Invoice Details - ${invoice.name}`, 20, 20);

    // Define the table columns and rows
    const columns = ['Criteria', 'Details'];
    const rows = [
      ['Name', invoice.name],
      ['Mobile No', invoice.mobile_no],
      ['Email', invoice.email],
      ['Address', invoice.address],
      ['Billing Type', invoice.billing_type],
      ['Item Count', invoice.item_count],
      ['Total Amount', invoice.total_amount],
    ];

    // Auto-generate the table without borders
    pdf.autoTable({
      startY: 30, // Starting Y position after the header
      head: [columns],
      body: rows,
      theme: 'plain', // Use the plain theme for no borders
    });

    // Save the PDF or open in a new tab
    pdf.save(`Invoice_${invoice.id}.pdf`);
  };

  return (
    <div>
      <Navbar />
    <div className="invoice-list-container">
      <h2>Invoice List</h2>
      <Link to="/invoices/add" className="link-button">
        <button className="add-invoice-button">Add Invoice</button>
      </Link>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Billing Type</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Item Count</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>
                <span>{invoice.name}  </span>
              </td>  
              <td>
                <span>{invoice.billing_type}</span>
              </td>
              <td>
                <span>{invoice.mobile_no}</span>
              </td>
              <td>
                <span>{invoice.email}</span>
              </td>
              <td>
                <span>{invoice.item_count}</span>
              </td>
              <td>
                <span>{invoice.total_amount}</span>
              </td>
              <td className="buttons-container">
                <Link to={`/invoices/${invoice.id}`} className="link-button">
                  <button className="ed">Edit</button>
                </Link>
                <button className="del" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
                <button className="see-pdf" onClick={() => handleSeePDF(invoice)}>See PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default InvoiceList;
