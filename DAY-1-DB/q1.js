
db.products.insertOne([
  {
    name: "Apple iPhone 14",
    category: "gadget",
    price: 1200,
    tags: ["smartphone", "iOS"],
    stock: 15,
    details: { warranty: true, color: "black" }
  }]);