# Product Inventory API

A simple RESTful API to manage product inventory.

## API Usage

Base URL:  
```
http://localhost:3000/api/products
```

### Endpoints

#### Get All Products
- **GET** `/api/products`

#### Get Product by ID
- **GET** `/api/products/{id}`

#### Create a Product
- **POST** `/api/products`
- **Body Example:**
    ```json
    {
        "name": "Keyboard",
        "description": "Mechanical keyboard",
        "quantity": 20,
        "price": 75.0
    }
    ```

#### Update a Product
- **PUT** `/api/products/{id}`
- **Body Example:**
    ```json
    {
        "name": "Laptop",
        "description": "15-inch display, 16GB RAM",
        "quantity": 8,
        "price": 1300.99
    }
    ```

#### Delete a Product
- **DELETE** `/api/products/{id}`

---

## Example Product Data

```json
{
    "name": "Monitor",
    "description": "24-inch Full HD",
    "quantity": 15,
    "price": 180.0
}
```

---

## Postman Collection

Download the [Product Inventory API Postman Collection](./Product_Inventory_API.postman_collection.json) and import it into Postman to test all endpoints.

---

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
