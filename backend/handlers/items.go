// handlers/items.go

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

// ItemHandler handles HTTP requests related to items.
type ItemHandler struct {
	DB *sql.DB
}

// NewItemHandler creates a new instance of ItemHandler.
func NewItemHandler(db *sql.DB) *ItemHandler {
	return &ItemHandler{DB: db}
}

// GetItems retrieves all items from the database.
func (h *ItemHandler) GetItems(w http.ResponseWriter, r *http.Request) {
	items := []models.Item{}

	// fetch items from the database
	rows, err := h.DB.Query("SELECT id, name, unit_price, item_category FROM items")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var item models.Item
		err := rows.Scan(&item.ID, &item.Name, &item.UnitPrice, &item.ItemCategory)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		items = append(items, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

// GetItem retrieves a specific item by ID from the database.
func (h *ItemHandler) GetItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	itemID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}

	item := models.Item{}

	// fetch a specific item from the database
	row := h.DB.QueryRow("SELECT id, name, unit_price, item_category FROM items WHERE id = $1", itemID)
	err = row.Scan(&item.ID, &item.Name, &item.UnitPrice, &item.ItemCategory)
	if err != nil {
		http.Error(w, "Item not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}

// AddItem adds a new item to the database.
func (h *ItemHandler) AddItem(w http.ResponseWriter, r *http.Request) {
	var newItem models.Item
	err := json.NewDecoder(r.Body).Decode(&newItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// add a new item to the database
	_, err = h.DB.Exec("INSERT INTO items (name, unit_price, item_category) VALUES ($1, $2, $3)",
		newItem.Name, newItem.UnitPrice, newItem.ItemCategory)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// UpdateItem updates an existing item in the database.
func (h *ItemHandler) UpdateItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	itemID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}

	var updatedItem models.Item
	err = json.NewDecoder(r.Body).Decode(&updatedItem)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// update an existing item in the database
	_, err = h.DB.Exec("UPDATE items SET name = $1, unit_price = $2, item_category = $3 WHERE id = $4",
		updatedItem.Name, updatedItem.UnitPrice, updatedItem.ItemCategory, itemID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// DeleteItem deletes a specific item by ID from the database.
func (h *ItemHandler) DeleteItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	itemID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}

	// delete a specific item from the database
	_, err = h.DB.Exec("DELETE FROM items WHERE id = $1", itemID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
