const Product = require("../models/Product");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const { productId, startTime, endTime } = req.body;

  const userId = req.user.userId; // Assumes user info is available via JWT middleware

  if (!userId) return res.status(400).json({ error: "Please login again." });

  try {
    // Validate inputs
    if (!productId || !startTime || !endTime) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if product exists and is available
    const product = await Product.findById(productId);
    if (!product || !product.availability) {
      return res.status(404).json({ error: "Product not available." });
    }

    // Calculate total price
    const hours = Math.ceil(
      (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60)
    );
    if (hours <= 0) {
      return res.status(400).json({ error: "Invalid booking duration." });
    }
    const totalPrice = hours * product.pricePerHour;

    // Create a new booking
    const booking = new Booking({
      productId,
      userId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      totalPrice,
    });

    await booking.save();

    // Mark product as unavailable
    product.availability = false;
    await product.save();

    res.status(201).json({
      message: "Booking created successfully!",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getUserAllBookings = async (req, res) => {
  try {
    const filters = {};
    const userId = req.user.userId;

    if (!userId) return res.status(404).json({ error: "No products found." });

    if (userId) {
      filters.userId = userId;
    }
    if (req.query.productId) {
      filters.productId = req.query.productId;
    }

    const bookings = await Booking.find(filters)
      .populate("userId", "username email") // Include user details
      .populate("productId", "name pricePerHour"); // Include product details

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateBooking = async (req, res) => {
  const { startTime, endTime, bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId).populate("productId");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Update fields
    if (startTime) booking.startTime = new Date(startTime);
    if (endTime) booking.endTime = new Date(endTime);

    // Recalculate total price if time is updated
    if (startTime || endTime) {
      const hours = Math.ceil(
        (new Date(booking.endTime) - new Date(booking.startTime)) /
          (1000 * 60 * 60)
      );

      if (hours <= 0) {
        return res.status(400).json({ error: "Invalid booking duration." });
      }

      // Ensure productId is populated with product details
      if (!booking.productId || !booking.productId.pricePerHour) {
        return res.status(500).json({ error: "Product details are missing." });
      }

      booking.totalPrice = hours * booking.productId.pricePerHour;
    }

    await booking.save();

    res.status(200).json({
      message: "Booking updated successfully!",
      booking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation failed.", details: error.errors });
    }

    res.status(500).json({ error: "Internal server error." });
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Mark product as available
    const product = await Product.findById(booking.productId);
    if (product) {
      product.availability = true;
      await product.save();
    }

    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getUserAllBookings,
  createBooking,
  updateBooking,
  cancelBooking,
};
