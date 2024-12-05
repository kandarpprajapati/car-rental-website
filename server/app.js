// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  // credentials: true, // Allow cookies and other credentials
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/booking", bookingRoutes);
// app.use("/api/payments", paymentRoutes);

module.exports = app;
