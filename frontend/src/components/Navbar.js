// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
      <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/items" className="nav-link">
          Items
        </Link>
        <Link to="/invoices" className="nav-link">
          Invoices
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
