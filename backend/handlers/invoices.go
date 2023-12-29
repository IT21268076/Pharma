// handlers/invoices.go

package handlers

import (
	"database/sql"
	"encoding/json"
	//"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"backend/models"
)

// InvoiceHandler handles HTTP requests related to invoices.
type InvoiceHandler struct {
	DB *sql.DB
}

// NewInvoiceHandler creates a new instance of InvoiceHandler.
func NewInvoiceHandler(db *sql.DB) *InvoiceHandler {
	return &InvoiceHandler{DB: db}
}

// GetInvoices retrieves all invoices from the database.
func (h *InvoiceHandler) GetInvoices(w http.ResponseWriter, r *http.Request) {
	invoices := []models.Invoice{}

	// fetch invoices from the database
	rows, err := h.DB.Query("SELECT id, name, mobile_no, email, address, billing_type, item_count, total_amount FROM invoices")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var invoice models.Invoice
		err := rows.Scan(&invoice.ID, &invoice.Name, &invoice.MobileNo, &invoice.Email, &invoice.Address, &invoice.BillingType, &invoice.ItemCount, &invoice.TotalAmount)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		invoices = append(invoices, invoice)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(invoices)
}

// GetInvoice retrieves a specific invoice by ID from the database.
func (h *InvoiceHandler) GetInvoice(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	invoiceID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid invoice ID", http.StatusBadRequest)
		return
	}

	invoice := models.Invoice{}

	// fetch a specific invoice from the database
	row := h.DB.QueryRow("SELECT id, name, mobile_no, email, address, billing_type, item_count, total_amount FROM invoices WHERE id = $1", invoiceID)
	err = row.Scan(&invoice.ID, &invoice.Name, &invoice.MobileNo, &invoice.Email, &invoice.Address, &invoice.BillingType, &invoice.ItemCount, &invoice.TotalAmount)
	if err != nil {
		http.Error(w, "Invoice not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(invoice)
}

// AddInvoice adds a new invoice to the database.
func (h *InvoiceHandler) AddInvoice(w http.ResponseWriter, r *http.Request) {
	var newInvoice models.Invoice
	err := json.NewDecoder(r.Body).Decode(&newInvoice)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// add a new invoice to the database
	_, err = h.DB.Exec("INSERT INTO invoices (name, mobile_no, email, address, billing_type, item_count, total_amount) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		newInvoice.Name, newInvoice.MobileNo, newInvoice.Email, newInvoice.Address, newInvoice.BillingType, newInvoice.ItemCount, newInvoice.TotalAmount)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// UpdateInvoice updates an existing invoice in the database.
func (h *InvoiceHandler) UpdateInvoice(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	invoiceID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid invoice ID", http.StatusBadRequest)
		return
	}

	var updatedInvoice models.Invoice
	err = json.NewDecoder(r.Body).Decode(&updatedInvoice)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// update an existing invoice in the database
	_, err = h.DB.Exec("UPDATE invoices SET name = $1, mobile_no = $2, email = $3, address = $4, billing_type = $5, item_count = $6, total_amount = $7 WHERE id = $6",
		updatedInvoice.Name, updatedInvoice.MobileNo, updatedInvoice.Email, updatedInvoice.Address, updatedInvoice.BillingType, updatedInvoice.ItemCount, updatedInvoice.TotalAmount, invoiceID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// DeleteInvoice deletes a specific invoice by ID from the database.
func (h *InvoiceHandler) DeleteInvoice(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	invoiceID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid invoice ID", http.StatusBadRequest)
		return
	}

	// delete a specific invoice from the database
	_, err = h.DB.Exec("DELETE FROM invoices WHERE id = $1", invoiceID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

