const stripe = require("../config/stripe");

const initiatePaymentIntent = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to the smallest currency unit
      currency: "eur",
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

const createCheckoutSession = async (req, res) => {
  const { totalPrice } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Payment methods you support
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Product Name", // Name of the product
              description: "Product description", // Optional
            },
            unit_amount: totalPrice * 100, // Amount in cents (e.g., $45.00)
          },
          quantity: 1, // Quantity of the product
        },
      ],
      mode: "payment", // Options: 'payment', 'setup', or 'subscription'
      success_url: "http://localhost:5173/success", // Redirect on success
      cancel_url: "http://localhost:5173/cancel", // Redirect on cancel
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
};

module.exports = { initiatePaymentIntent, createCheckoutSession };
