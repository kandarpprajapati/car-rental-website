const stripe = require("../config/stripe");
const { STRIPE_WEBHOOK_SECRET, ADMIN_EMAIL } = require("../config/env");
const {
  createBooking,
  createBookingFromSession,
} = require("./bookingController");
const Product = require("../models/Product");
const sendBookingEmails = require("../utils/sendBookingEmails");
const generateEmailContent = require("../utils/htmlContentForBookingEmail");

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
  const { totalPrice, bookingDetails } = req.body;

  try {
    // Fetch product details using the productId from bookingDetails
    const product = await Product.findById(bookingDetails.productId); // Assuming Product is your model

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"], // Payment methods you support
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: product.name, // Name of the product
            },
            unit_amount: totalPrice * 100, // Amount in cents (e.g., $45.00)
          },
          quantity: 1, // Quantity of the product
        },
      ],
      mode: "payment", // Options: 'payment', 'setup', or 'subscription'
      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}", // Redirect on success
      cancel_url: "http://localhost:5173", // Redirect on cancel
      metadata: {
        bookingDetails: JSON.stringify(bookingDetails), // Store the booking details here
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
};

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = STRIPE_WEBHOOK_SECRET; // Stripe webhook secret key

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Error verifying webhook signature:", err);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the successful payment event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object; // Stripe session object

    // Check if the payment was successful
    if (session.payment_status === "paid") {
      // Assuming you have booking details in session metadata or another way
      const bookingDetails = session.metadata;

      // Call your booking function here
      try {
        const booking = await createBookingFromSession(bookingDetails);
        console.log("Booking created successfully:", booking);
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    }
  }

  // Send success response to Stripe
  res.status(200).send("Webhook received");
};

const confirmPayment = async (req, res) => {
  const { session_id } = req.query;
  const userId = req.user.userId;
  const userEmail = req.user.email;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // Payment was successful, now confirm the booking
      const bookingDetails = JSON.parse(session.metadata.bookingDetails); // Get the booking details

      console.log(bookingDetails);

      // Call the function to create the booking from the stored details
      const booking = await createBookingFromSession(bookingDetails, userId);

      if (booking === "Booking created successfully!") {
        const product = await Product.findById(bookingDetails.productId);

        // Generate email content for both customer and admin
        const { customerEmailContent, adminEmailContent } =
          generateEmailContent(bookingDetails, product.name, userEmail);

        // Send email to the customer
        await sendBookingEmails(
          userEmail,
          "Booking Confirmation",
          customerEmailContent
        );

        // Send email to the admin
        await sendBookingEmails(
          ADMIN_EMAIL, // Ensure ADMIN_EMAIL is defined in your environment variables
          "New Booking Alert",
          adminEmailContent
        );

        res
          .status(200)
          .json({ message: "Booking confirmed and emails sent successfully!" });
      } else {
        res.status(400).json({ error: booking });
      }
    } else {
      res.status(400).json({ error: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  initiatePaymentIntent,
  createCheckoutSession,
  handleStripeWebhook,
  confirmPayment,
};
