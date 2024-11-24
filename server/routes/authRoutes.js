// routes/authRoutes.js

const express = require("express");
const {
  register,
  login,
  profile,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, profile);
router.get("/getuser/:userId", getUserById);

router.post("/register", register);
router.post("/login", login);

router.patch("/update/:userId", updateUser);

router.delete("/delete", protect, deleteUser);

module.exports = router;

// getUserById
// updateUser
