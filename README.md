# ABC Pharmacy Web System

## Overview

ABC Pharmacy Web System is a small web application designed to manage items and create invoices for ABC Pharmacy. 
This application is built using PostgreSQL for the database, Golang for the backend, and ReactJS for the frontend.

## Features

-Add, update, delete and view items.
-Create invoices with required details.

### Item Management

1. **Add Item:**
   - Collects Name, Unit Price, and Item Category.
   - Allows users to add new items to the system.

2. **Edit Item:**
   - Enables users to edit existing items.
   - Collects Name, Unit Price, and Item Category.

3. **Delete Item:**
   - Allows users to delete items from the system.
  
4. **View Items:**
   - View list of items.
   - Generate a customized report in PDF can be download and available offline.

### Invoice Creation

1. **Add Invoice:**
   - Captures Name, Mobile No, Email, Address, Billing Type, and any additional necessary fields.
   - Allows users to create new invoices.

2. **Edit Invoice:**
   - Enables users to edit existing invoices.
   - Captures Name, Mobile No, Email, Address, Billing Type, and any additional necessary fields.

3. **Delete Invoice:**
   - Allows users to delete invoices.
  
4. **View Items:**
   - View list of invoices.
   - Download organized invoice seperately by see PDF button for each invoice.

### Navigation

- Navigation bar for easy navigation between different sections.

## Backend Setup

### Prerequisites

- Go (Golang) installed
- PostgreSQL installed

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Set up the PostgreSQL database:

    - Create a new database.
    - Run the provided SQL queries in `database/database.go` to create the required tables.
    - A pre-created sql query with dummy data is uploaded to the repo, download it and try.

3. Set up the Go backend:

    ```bash
    cd backend
    go mod tidy
    go run main.go
    ```
    - There are some libraries need to run install them using go get command if error occured. -> see go.mod file.
      
   The backend server will be running at `http://localhost:8090`.
   -Change port if needed in main.go file.

## Frontend Setup

### Prerequisites

- Node.js and npm installed

### Setup Instructions

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the frontend:

    ```bash
    npm start
    ```

   The frontend will be running at `http://localhost:3000`.

## Usage

-Manage items.
-Invoicing.
-Report generation.




