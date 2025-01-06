const Product = require("../models/Product");
const Booking = require("../models/Booking");
const XLSX = require("xlsx");
const fs = require("fs");

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

      // Add the next time slot (if it exists) to the occupiedTimes
      const nextStart = parseInt(end); // Get the ending hour as an integer
      const nextEnd = nextStart + 1; // Calculate the next hour
      const nextSlot = `${end}-${nextEnd}`; // Format the next time slot
      const [nextStartHour, nextEndHour] = nextSlot.split("-");

      // Avoid duplicates in occupiedTimes
      if (
        !product.occupiedTimes.some(
          (occupied) =>
            occupied.date === date &&
            occupied.start === nextStartHour &&
            occupied.end === nextEndHour
        ) &&
        !newOccupiedTimes.some(
          (occupied) =>
            occupied.date === date &&
            occupied.start === nextStartHour &&
            occupied.end === nextEndHour
        )
      ) {
        newOccupiedTimes.push({ date, start: nextStartHour, end: nextEndHour });
      }
    });

    // Update only the occupiedTimes
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

const createBookingFromSession = async (bookingDetails, userId) => {
  const {
    productId,
    time, // Array of selected time slots (e.g., ["10:00-11:00", "11:00-12:00"])
    date, // Booking date (e.g., "2025-01-07")
    helper,
    helperPrice,
    price,
    distancePrice,
    totalPrice,
    specialRequirements,
    phonecode,
    phone,
    deliveryFrom,
    deliveryTo,
  } = bookingDetails;

  // Check if user is logged in
  if (!userId) {
    return "Please login again.";
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
      return "All fields are required.";
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return "Product not found.";
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
      return `The following times are already occupied: ${unavailableTimes.join(
        ", "
      )}.`;
    }

    // Create a new booking with the data provided in bookingDetails
    const booking = new Booking({
      productId,
      userId,
      time,
      date: new Date(date), // Convert date string to Date object
      totalPrice,
      deliveryFrom,
      deliveryTo,
      helper: helper ? "Yes" : "No",
      helperPrice, // Store the helper price
      price, // Store the base price (before any additions)
      distancePrice, // Store the distance price (if applicable)
      phone: `${phonecode} ${phone}`, // Store the phone number with the country code
      spacialRequirement: specialRequirements, // Store special requirements
      paymentStatus: "paid", // Set payment status to pending (default)
    });

    // Save the booking to the database
    await booking.save();

    // Update product's available and occupied times
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

      // Add the next time slot (if it exists) to the occupiedTimes
      const nextStart = parseInt(end); // Get the ending hour as an integer
      const nextEnd = nextStart + 1; // Calculate the next hour
      const nextSlot = `${end}-${nextEnd}`; // Format the next time slot
      const [nextStartHour, nextEndHour] = nextSlot.split("-");

      // Avoid duplicates in occupiedTimes
      if (
        !product.occupiedTimes.some(
          (occupied) =>
            occupied.date === date &&
            occupied.start === nextStartHour &&
            occupied.end === nextEndHour
        ) &&
        !newOccupiedTimes.some(
          (occupied) =>
            occupied.date === date &&
            occupied.start === nextStartHour &&
            occupied.end === nextEndHour
        )
      ) {
        newOccupiedTimes.push({ date, start: nextStartHour, end: nextEndHour });
      }
    });

    // Update only the occupiedTimes
    product.occupiedTimes = [...product.occupiedTimes, ...newOccupiedTimes];

    // Save the updated product with the new occupied times
    await product.save();

    return "Booking created successfully!";
  } catch (error) {
    console.error("Error creating booking:", error);
    return "Internal server error.";
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

// Fetch all bookings for today and export to Excel
const exportTodayBookingsToExcel = async (req, res) => {
  try {
    // Get the start and end of the current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Query bookings for today
    const bookings = await Booking.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("userId", "username email")
      .populate("productId", "name pricePerHour");

    if (!bookings.length) {
      return res
        .status(200)
        .json({ found: false, message: "No bookings found for today." });
    }

    // Format bookings data for Excel
    const formattedData = bookings.map((booking) => ({
      CustomerName: booking.userId.username,
      CustomerEmail: booking.userId.email,
      Phone: booking.phone,
      ProductName: booking.productId.name,
      BookingDate: booking.date.toISOString().split("T")[0], // Formatting date (e.g., 2025-01-07)
      TimeSlots: booking.time.join(", "), // Joining time slots into a string
      DeliveryFrom: booking.deliveryFrom,
      DeliveryTo: booking.deliveryTo,
      Helper: booking.helper === "Yes" ? "Yes" : "No", // Ensure it's a string
      TotalPrice: `${booking.totalPrice} €`,
      HelperPrice: `${booking.helperPrice} €`,
      DistancePrice: `${booking.distancePrice} €`,
      SpecialRequirement: booking.spacialRequirement || "None", // Handle empty fields
      PaymentStatus: booking.paymentStatus,
    }));

    // Create a new workbook and add data
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Today's Bookings");

    // Write to a temporary file
    const filePath = "today_bookings.xlsx";
    console.log("Writing file to:", filePath);
    XLSX.writeFile(workbook, filePath);

    // Set the headers for Excel file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="today_bookings.xlsx"'
    );

    // Send the file for download
    // res.download(filePath, () => {
    //   // Ensure the file is deleted after download is complete
    //   res.on("finish", () => {
    //     fs.unlinkSync(filePath);
    //     console.log("File deleted after download");
    //   });
    // });

    res.download(filePath, (err) => {
      if (err) {
        console.error("Error during file download:", err);
      } else {
        console.log("File downloaded successfully.");
      }
      // Delete the file after sending
      fs.unlinkSync(filePath);
      console.log("File deleted after download.");
    });
  } catch (error) {
    console.error("Error fetching bookings or exporting to Excel:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getUserAllBookings,
  createBooking,
  updateBooking,
  cancelBooking,
  exportTodayBookingsToExcel,
  createBookingFromSession,
};
