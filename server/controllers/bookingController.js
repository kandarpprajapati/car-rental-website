const { getDB } = require("../config/db");

const getAllBookings = async (req, res) => {
  try {
    const db = getDB();
    const bookings = db.collection("bookings");

    const allBookings = await bookings.find().toArray();
    res.status(200).json(allBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDB();
    const bookings = db.collection("bookings");

    const booking = await bookings.findOne({ _id: new ObjectId(id) });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

const createBooking = async (req, res) => {
  const { userId, carId, startDate, endDate, totalPrice } = req.body;

  if (!userId || !carId || !startDate || !endDate || !totalPrice) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const db = getDB();
    const bookings = db.collection("bookings");

    const newBooking = {
      userId,
      carId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
      status: "booked",
      createdAt: new Date(),
    };

    const result = await bookings.insertOne(newBooking);
    res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, status } = req.body;

  try {
    const db = getDB();
    const bookings = db.collection("bookings");

    const updatedBooking = {};
    if (startDate) updatedBooking.startDate = new Date(startDate);
    if (endDate) updatedBooking.endDate = new Date(endDate);
    if (status) updatedBooking.status = status;

    const result = await bookings.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedBooking }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update booking" });
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDB();
    const bookings = db.collection("bookings");

    const result = await bookings.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "canceled" } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
};

const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const db = getDB();
    const bookings = db.collection("bookings");

    const userBookings = await bookings.find({ userId }).toArray();
    res.status(200).json(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking,
  getUserBookings,
};
