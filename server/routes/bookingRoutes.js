const express = require("express");
const {
  getUserAllBookings,
  createBooking,
  updateBooking,
  cancelBooking,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/userbookings", protect, getUserAllBookings);

router.post("/create", protect, createBooking);

router.patch("/update", updateBooking);

router.delete("/cancel/:id", cancelBooking);

module.exports = router;
