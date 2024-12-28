const Product = require("../models/Product");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  const {
    productId,
    time, // Array of selected time slots (e.g., ["10:00-11:00", "11:00-12:00"])
    date, // Booking date (e.g., "2024-12-28")
    helper,
    options,
    specialRequirements,
    phonecode,
    phone,
    deliveryFrom,
    deliveryTo,
  } = req.body;

  const userId = req.user.userId; // Assumes user info is available via JWT middleware

  if (!userId) {
    return res.status(400).json({ error: "Please login again." });
  }

  try {
    // Validate required inputs
    if (
      !productId ||
      !time ||
      !Array.isArray(time) ||
      time.length === 0 ||
      !date ||
      !phone ||
      !deliveryFrom ||
      !deliveryTo
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Validate that selected times are available
    const unavailableTimes = time.filter((slot) =>
      product.occupiedTimes.some(
        (occupied) =>
          occupied.date === date &&
          occupied.start === slot.split("-")[0] &&
          occupied.end === slot.split("-")[1]
      )
    );

    if (unavailableTimes.length > 0) {
      return res.status(400).json({
        error: `The following times are already occupied: ${unavailableTimes.join(
          ", "
        )}.`,
      });
    }

    // Calculate total price (example logic, customizable)
    const basePrice = product.pricePerHour; // Assuming the Product model has a `pricePerHour` field
    const helperCost = helper ? 20 : 0; // Example cost for helper
    const totalPrice = basePrice * time.length + helperCost; // Price per selected time slot

    // Create a new booking
    const booking = new Booking({
      productId,
      userId,
      time,
      date: new Date(date),
      totalPrice,
      deliveryFrom,
      deliveryTo,
      helper: helper ? "Yes" : "No",
      options,
      phone: `${phonecode} ${phone}`,
      spacialRequirement: specialRequirements,
      paymentStatus: "pending", // Default to pending
    });

    await booking.save();

    // Move selected times from availableTimes to occupiedTimes
    const updatedAvailableTimes = product.availableTimes.filter(
      ({ start, end }) =>
        !time.some((slot) => {
          const [slotStart, slotEnd] = slot.split("-");
          return slotStart === start && slotEnd === end;
        })
    );

    // Find the next consecutive times and add them to the occupiedTimes
    const newOccupiedTimes = [];
    time.forEach((slot) => {
      const [start, end] = slot.split("-");
      newOccupiedTimes.push({ date, start, end });

      // Add the next time slot (if exists) to the occupiedTimes
      const nextStart = parseInt(end.split(":")[0]) + 1; // Assuming 1-hour slots, add the next hour
      const nextEnd = `${nextStart}:00`;
      const nextSlot = `${end}-${nextEnd}`;
      const [nextStartHour, nextEndHour] = nextSlot.split("-");

      if (
        !product.occupiedTimes.some(
          (occupied) =>
            occupied.date === date &&
            occupied.start === nextStartHour &&
            occupied.end === nextEndHour
        )
      ) {
        newOccupiedTimes.push({ date, start: nextStartHour, end: nextEndHour });
      }
    });

    product.availableTimes = updatedAvailableTimes;
    product.occupiedTimes = [...product.occupiedTimes, ...newOccupiedTimes];

    // Save the updated product
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
