// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // product name or model
  description: { type: String, required: true }, // product description
  pricePerHour: [
    {
      name: { type: String, required: true },
      discountPrice: { type: Number, required: true },
      originalPrice: { type: Number, required: true },
    },
  ], // Price per hour
  category: { type: String, required: true },
  availableTimes: [
    {
      start: { type: String, required: true }, // Start time (e.g., "10:00 AM")
      end: { type: String, required: true }, // End time (e.g., "11:00 AM")
    },
  ],
  occupiedTimes: [
    {
      date: { type: String, required: true }, // Date (e.g., "YYYY-MM-DD")
      start: { type: String, required: true }, // Start time (e.g., "10:00 AM")
      end: { type: String, required: true }, // End time (e.g., "11:00 AM")
    },
  ],
  extraHelperPrice: { type: Number },
  imageUrl: { type: String }, // URL for the product's image
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the product was added
});

module.exports = mongoose.model("Product", productSchema);
