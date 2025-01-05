const express = require("express");
const {
  initiatePaymentIntent,
  createCheckoutSession,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/initiate-payment-intent", initiatePaymentIntent);

router.post("/create-checkout-session", protect, createCheckoutSession);

module.exports = router;
