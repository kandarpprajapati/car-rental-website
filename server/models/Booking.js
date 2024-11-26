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
  startTime: { type: Date, required: true }, // Booking start date and time
  endTime: { type: Date, required: true }, // Booking end date and time
  totalPrice: { type: Number, required: true }, // Total calculated price for the booking
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"], // Payment status
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp for booking creation
});

module.exports = mongoose.model("Booking", bookingSchema);
