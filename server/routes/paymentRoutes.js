const express = require("express");
const {
  initiatePaymentIntent,
  createCheckoutSession,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/initiate-payment-intent", initiatePaymentIntent);

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
