// controllers/authController.js

const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/jwt");
const User = require("../models/User");

// Register function
const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check for required fields
    if (!username || !password || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // Create a new user instance
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 16), // Hash password before saving
    });

    // Save the user to the database (Mongoose handles validation and schema constraints)
    await user.save();

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if email and password are provided
    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if user exists
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(400).json({ error: "Invalid credentials." });

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user's details
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 16); // Hash password before saving

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const deleteUser = async (req, res) => {
  const userInfo = req.user;

  try {
    // Check if user exists
    const user = await User.findById(userInfo.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Delete the user
    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

const profile = async (req, res) => {
  // req.user will have the decoded token info if token is valid
  res.status(200).json({
    message: "Access granted to protected profile.",
    user: req.user, // Here, we can send back user data
  });
};

module.exports = {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
  profile,
};
