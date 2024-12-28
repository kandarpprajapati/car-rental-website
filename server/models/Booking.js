// models/Booking.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product (Car) schema
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  time: { type: [String], required: true }, // Booking time
  date: { type: Date, required: true },
  totalPrice: { type: Number, required: true }, // Total calculated price for the booking
  deliveryFrom: { type: String, required: true },
  deliveryTo: { type: String, required: true },
  helper: { type: String },
  options: { type: String, required: true },
  phone: { type: String, required: true },
  spacialRequirement: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"], // Payment status
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp for booking creation
});

module.exports = mongoose.model("Booking", bookingSchema);
