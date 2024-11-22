const express = require("express");
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
  getUserBookings,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/user/:userId", getUserBookings);

router.put("/:id", updateBooking);

router.patch("/:id/cancel", cancelBooking);

router.post("/create", createBooking);

module.exports = router;
