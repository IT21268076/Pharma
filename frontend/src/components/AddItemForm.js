// src/components/AddItemForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddItemForm.css'; 

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const navigate = useNavigate();

  const handleAddItem = () => {
    // Send a POST request to add a new item
    axios.post('http://localhost:8090/api/items', {
      name: itemName,
      unit_price: parseFloat(itemPrice),
      item_category: itemCategory,
    })
    .then(response => {
      console.log('Item added successfully:', response.data);
      // Navigate back to the item list after successful addition
      navigate('/items');
    })
    .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="text" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input type="text" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} />
      </div>
      <button className="add-item-button" onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default AddItemForm;
