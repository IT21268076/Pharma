// src/components/ItemList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExportToPDF from './ExportToPDF';
import './ItemList.css';
import Navbar from './Navbar';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend API
    axios.get('http://localhost:8090/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleDeleteItem = (itemId) => {
    // Send a DELETE request to delete the item
    axios.delete(`http://localhost:8090/api/items/${itemId}`)
      .then(response => {
        // Update the state to reflect the deleted item
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        console.log('Item deleted successfully:', response.data);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <Navbar />
    <div className="item-list-container"> 
      <h2>Item List</h2>
      <Link to="/items/add" className="item-list-link-button">
        <button className="item-list-edit-button">Add Item</button>
      </Link>

      <table className="item-list-table">
        <thead>
          <tr>
            <th className="item-list-th">Name</th>
            <th className="item-list-th">Unit Price</th>
            <th className="item-list-th">Category</th>
            <th className="item-list-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="item-list-tr">
              <td className="item-list-td">{item.name}</td>
              <td className="item-list-td">{item.unit_price}</td>
              <td className="item-list-td">{item.item_category}</td>
              <td className="item-list-td">
                <Link to={`/items/${item.id}`} className="item-list-link-button">
                  <button className="item-list-edit-button">Edit</button>
                </Link>
                <button className="item-list-delete-button" onClick={() => handleDeleteItem(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ExportToPDF items={items} />
    </div>
    </div>
  );
};

export default ItemList;
