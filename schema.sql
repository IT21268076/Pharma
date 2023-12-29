-- schema.sql

-- Items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unit_price DECIMAL NOT NULL,
    item_category VARCHAR(50) NOT NULL
);

-- Invoices table
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile_no VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    billing_type VARCHAR(50) NOT NULL,
    item_count INT NOT NULL DEFAULT 0,
    total_amount DECIMAL NOT NULL DEFAULT 0
);

-- Insert dummy data for items table
INSERT INTO items (name, unit_price, item_category) VALUES
  ('Item 1', 10.99, 'Category A'),
  ('Item 2', 20.49, 'Category B'),
  ('Item 3', 15.00, 'Category A'),
  ('Item 4', 5.99, 'Category C'),
  ('Item 5', 25.99, 'Category B');

-- Insert dummy data for invoices table
INSERT INTO invoices (name, mobile_no, email, address, billing_type, item_count, total_amount) VALUES
  ('Invoice 1', '1234567890', 'invoice1@example.com', 'Address 1', 'Cash', 3, 49.99),
  ('Invoice 2', '9876543210', 'invoice2@example.com', 'Address 2', 'Credit Card', 2, 30.49),
  ('Invoice 3', '5556667777', 'invoice3@example.com', 'Address 3', 'Cash', 1, 15.00),
  ('Invoice 4', '9998887777', 'invoice4@example.com', 'Address 4', 'Credit Card', 4, 41.96),
  ('Invoice 5', '1112223333', 'invoice5@example.com', 'Address 5', 'Cash', 2, 51.98);
