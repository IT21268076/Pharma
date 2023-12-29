// src/components/EditItemForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    // Fetch the item data for editing
    axios.get(`http://localhost:8090/api/items/${itemId}`)
      .then(response => {
        const item = response.data;
        setItemName(item.name);
        setItemPrice(item.unit_price);
        setItemCategory(item.item_category);
      })
      .catch(error => console.error('Error fetching item for editing:', error));
  }, [itemId]);

  const handleUpdateItem = () => {
    // Send a PUT request to update the item
    axios.put(`http://localhost:8090/api/items/${itemId}`, {
      name: itemName,
      unit_price: parseFloat(itemPrice),
      item_category: itemCategory,
    })
    .then(response => {
      console.log('Item updated successfully:', response.data);
      // Navigate back to the item list after successful update
      navigate('/items');
    })
    .catch(error => console.error('Error updating item:', error));
  };

  return (
    <div className="edit-container">
      <h2>Edit Item</h2>
      {/* Item Name */}
      <label htmlFor="itemName">Name:</label>
      <input
        type="text"
        id="itemName"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      {/* Item Price */}
      <label htmlFor="itemPrice">Price:</label>
      <input
        type="number"
        id="itemPrice"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
      />

      {/* Item Category */}
      <label htmlFor="itemCategory">Category:</label>
      <input
        type="text"
        id="itemCategory"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      />

      {/* Button to Update Item */}
      <button onClick={handleUpdateItem}>Update Item</button>
    </div>
  );
};

export default EditItemForm;
