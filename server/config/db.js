// config/db.js

const { MongoClient } = require("mongodb");
const { MONGO_URL, DB_NAME } = require("./env");

if (!MONGO_URL) {
  throw new Error("MongoDB URI is not defined in the environment variables.");
}

const client = new MongoClient(MONGO_URL);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const getDB = () => {
  return client.db(DB_NAME); // Returns the connected database
};

module.exports = { connectDB, getDB };
