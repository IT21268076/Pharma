// models/item.go

package models

// Item represents the structure of an item in the database.
type Item struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	UnitPrice   float64 `json:"unit_price"`
	ItemCategory string `json:"item_category"`
}
