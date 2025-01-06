const express = require("express");
const {
  initiatePaymentIntent,
  createCheckoutSession,
  confirmPayment,
  handleStripeWebhook,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/initiate-payment-intent", initiatePaymentIntent);

router.post("/create-checkout-session", protect, createCheckoutSession);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

router.get("/confirm-payment", protect, confirmPayment);

module.exports = router;
