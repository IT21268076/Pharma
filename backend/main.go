// main.go

package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"backend/database"
	"backend/handlers"
	"github.com/rs/cors"
)


func main() {
	// Connect to the database
	db, err := database.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}

	// Create tables if not exists
	createTables(db)

	// Initialize router and handlers
	router := mux.NewRouter()
	itemHandler := handlers.NewItemHandler(db)
	invoiceHandler := handlers.NewInvoiceHandler(db)

	// Create a new CORS handler
	corsHandler := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
        AllowCredentials: true,
		AllowedMethods: []string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"},
    }).Handler(router)

	// Define API routes
	router.HandleFunc("/api/items", itemHandler.GetItems).Methods("GET")
	router.HandleFunc("/api/items", itemHandler.AddItem).Methods("POST")
	router.HandleFunc("/api/items/{id}", itemHandler.GetItem).Methods("GET")
	router.HandleFunc("/api/items/{id}", itemHandler.UpdateItem).Methods("PUT")
	router.HandleFunc("/api/items/{id}", itemHandler.DeleteItem).Methods("DELETE")

	router.HandleFunc("/api/invoices", invoiceHandler.GetInvoices).Methods("GET")
	router.HandleFunc("/api/invoices", invoiceHandler.AddInvoice).Methods("POST")
	router.HandleFunc("/api/invoices/{id}", invoiceHandler.GetInvoice).Methods("GET")
	router.HandleFunc("/api/invoices/{id}", invoiceHandler.UpdateInvoice).Methods("PUT")
	router.HandleFunc("/api/invoices/{id}", invoiceHandler.DeleteInvoice).Methods("DELETE")
	
	// Start the server
	port := 8090
	fmt.Printf("Server started on :%d\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), corsHandler))
}

func createTables(db *sql.DB) {
	_, err := db.Exec(database.CreateItemTableQuery)
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec(database.CreateInvoiceTableQuery)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Tables created successfully")
}
