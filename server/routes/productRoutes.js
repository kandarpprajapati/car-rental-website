// routes/productRoutes.js

const express = require("express");
const {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
  getAvailableTimesByDate,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts); // Get all products
router.get("/get/:productId", getProductById); // Get a single product by ID
router.get("/available-times", getAvailableTimesByDate);

router.post("/create", createProduct); // Create a product

router.patch("/update/:productId", updateProduct); // Update a product by ID

router.delete("/delete/:productId", deleteProduct); // Delete a product by ID

module.exports = router;
