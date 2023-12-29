# ABC Pharmacy Web System

## Overview

ABC Pharmacy Web System is a small web application designed to manage items and create invoices for ABC Pharmacy. 
This application is built using PostgreSQL for the database, Golang for the backend, and ReactJS for the frontend.

## Features



### Landing Page

A visually appealing landing page showcases the UI/UX design skills with a background image and a navigation bar.

### Item Management

1. **Add Item:**
   - Collects Name, Unit Price, and Item Category.
   - Allows users to add new items to the system.

2. **Edit Item:**
   - Enables users to edit existing items.
   - Collects Name, Unit Price, and Item Category.

3. **Delete Item:**
   - Allows users to delete items from the system.

### Invoice Creation

1. **Add Invoice:**
   - Captures Name, Mobile No, Email, Address, Billing Type, and any additional necessary fields.
   - Allows users to create new invoices.

2. **Edit Invoice:**
   - Enables users to edit existing invoices.
   - Captures Name, Mobile No, Email, Address, Billing Type, and any additional necessary fields.

3. **Delete Invoice:**
   - Allows users to delete invoices.

### Navigation

- Navigation bar without borders for easy navigation between different sections.

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

3. Set up the Go backend:

    ```bash
    cd backend
    go mod tidy
    go run main.go
    ```

   The backend server will be running at `http://localhost:8090`.

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

Provide instructions on how to use the application, including any user interactions or workflows.

## Contributing

Explain how others can contribute to the project.

## License

Specify the license for your project.

