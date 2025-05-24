
// Write a query to get all products where details.warranty exists and is true
db.products.find({
  "details.warranty": true
})
