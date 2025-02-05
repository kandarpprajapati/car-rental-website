// config/env.js

require("dotenv").config(); // Load environment variables from .env file

// Export environment variables
module.exports = {
  PORT: process.env.PORT || 1102,
  MONGO_URL: process.env.MONGO_URL,
  FRONT_END_URL: process.env.FRONT_END_URL,
  COLLECTION: process.env.COLLECTION,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_EMAIL_PASS: process.env.ADMIN_EMAIL_PASS,
};
