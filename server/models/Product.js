// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // product name or model
  description: { type: String, required: true }, // product description
  pricePerHour: { type: Number, required: true }, // Price per hour
  category: { type: String, required: true },
  availability: {
    type: Boolean,
    default: true, // Indicates if the product is currently available
  },
  extraHelperPrice: { type: Number },
  imageUrl: { type: String }, // URL for the product's image
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the product was added
});

module.exports = mongoose.model("Product", productSchema);
