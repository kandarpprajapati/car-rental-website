// routes/productRoutes.js

const express = require("express");
const {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts,
  searchProducts,
  createProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts); // Get all products
router.get("/get/:id", getProductById); // Get a single product by ID
router.get("/filter", filterProducts); // Filter products
router.get("/search", searchProducts); // Search products

router.post("/create", createProduct); // Create a product

router.put("/:id", updateProduct); // Update a product by ID

router.delete("/:id", deleteProduct); // Delete a product by ID

module.exports = router;
