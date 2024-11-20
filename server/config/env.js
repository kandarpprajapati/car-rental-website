// config/env.js

require("dotenv").config(); // Load environment variables from .env file

// Export environment variables
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL,
  DB_NAME: process.env.DB_NAME,
  COLLECTION: process.env.COLLECTION,
  JWT_SECRET: process.env.JWT_SECRET,
};
