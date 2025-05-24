
// Find all products with price between 500 and 2000
db.products.find({
  price: { $gte: 500, $lte: 2000 }
});


// Find products that include either "smartphone" or "laptop" in tags
db.products.find({
  tags: { $in: ["smartphone", "laptop"] }
});


// Update all products in the "gadget" category to reduce stock by 5
db.products.updateMany(
  { category: "gadget" },
  { $inc: { stock: -5 } }
);


// Delete products where stock is 0
db.products.deleteMany({
  stock: { $eq: 0 }
});



//Use $regex to find products that start with the letter “A”
db.products.find({
  name: { $regex: 'val', $options: "i" }  
})


