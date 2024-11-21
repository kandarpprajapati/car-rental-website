// controllers/productController.js

const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  // Validate required fields
  if (!name || !price || !category) {
    return res.status(400).json({
      error: "Name, price, and category are required fields.",
    });
  }

  try {
    const db = getDB();
    const products = db.collection("products");

    const newProduct = {
      name,
      description: description || "",
      price: parseFloat(price),
      category,
      stock: stock || 0, // Default stock to 0 if not provided
      createdAt: new Date(),
    };

    const result = await products.insertOne(newProduct);

    res.status(201).json({
      message: "Product created successfully.",
      productId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product." });
  }
};

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;

  try {
    const db = getDB();
    const products = db.collection("products");

    const query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" }; // Case-insensitive search

    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    };

    const productList = await products.find(query, options).toArray();
    const totalProducts = await products.countDocuments(query);

    res.status(200).json({
      total: totalProducts,
      page: parseInt(page),
      limit: parseInt(limit),
      products: productList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDB();
    const products = db.collection("products");

    const product = await products.findOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Ensure validation for fields before updating

  try {
    const db = getDB();
    const products = db.collection("products");

    const result = await products.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDB();
    const products = db.collection("products");

    const result = await products.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

const filterProducts = async (req, res) => {
  const { minPrice, maxPrice, category } = req.query;

  try {
    const db = getDB();
    const products = db.collection("products");

    const query = {};

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (category) query.category = category;

    const filteredProducts = await products.find(query).toArray();

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to filter products" });
  }
};

const searchProducts = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    const db = getDB();
    const products = db.collection("products");

    const results = await products
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search products" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProducts,
  searchProducts,
};
