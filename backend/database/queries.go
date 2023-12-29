// queries.go

package database

const (
	CreateItemTableQuery = `
		CREATE TABLE IF NOT EXISTS items (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			unit_price DECIMAL NOT NULL,
			item_category VARCHAR(50) NOT NULL
		)
	`

	CreateInvoiceTableQuery = `
		CREATE TABLE IF NOT EXISTS invoices (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			mobile_no VARCHAR(15) NOT NULL,
			email VARCHAR(255) NOT NULL,
			address TEXT NOT NULL,
			billing_type VARCHAR(50) NOT NULL,
			item_count INT NOT NULL,
    		total_amount DECIMAL NOT NULL
		)
	`
)
