const express = require("express");
const { initiatePaymentIntent } = require("../controllers/paymentController");

const router = express.Router();

router.post("/initiate-payment-intent", initiatePaymentIntent);

module.exports = router;
