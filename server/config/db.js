// config/db.js

const mongoose = require("mongoose");
const { MONGO_URL } = require("./env");

if (!MONGO_URL) {
  throw new Error("MongoDB URI is not defined in the environment variables.");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
