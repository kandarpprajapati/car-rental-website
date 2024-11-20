// controllers/authController.js

const bcrypt = require("bcryptjs");
const { getDB } = require("../config/db");
const { generateToken } = require("../config/jwt");

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const db = getDB();
    const users = db.collection("users");

    // Check if user already exists
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await users.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  try {
    const db = getDB();
    const users = db.collection("users");

    // Find user
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Generate JWT token
    const token = generateToken({ id: user._id, username: user.username });

    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

const profile = async (req, res) => {
  // req.user will have the decoded token info if token is valid
  res.status(200).json({
    message: "Access granted to protected profile.",
    user: req.user, // Here, we can send back user data
  });
};

module.exports = { register, login, profile };
