package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ChargeTax struct {
	Amount float64 `json:"amount"`
}

var operations = map[string]func(float64) float64{
	"deposit":  func(amount float64) float64 { return 0.0 },
	"withdraw": func(amount float64) float64 { return 10 },
	"transfer": func(amount float64) float64 { return amount * 0.2 },
}

func chargeOperation(c *gin.Context) {
	amount := c.Query("amount")
	operation := c.Query("operation")

	fmt.Println(amount)
	fmt.Println(operation)

	if operation, exist := operations[operation]; exist {
		amount, err := strconv.ParseFloat(amount, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "amount is not a number"})
		}
		c.JSON(http.StatusOK, gin.H{"tax": operation(amount)})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "operation not found"})
	}

}

func main() {

	router := gin.Default()
	router.GET("/tax", chargeOperation)
	router.Run(":8080")
}
