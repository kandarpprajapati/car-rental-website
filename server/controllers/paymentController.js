const stripe = require("../config/stripe");

const initiatePaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Amount and currency are required." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert amount to the smallest currency unit
      currency: currency,
      payment_method_types: ["card"], // Define supported payment methods
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error initiating payment intent:", error);
    res.status(500).json({ error: "Failed to initiate payment intent." });
  }
};

module.exports = { initiatePaymentIntent };
