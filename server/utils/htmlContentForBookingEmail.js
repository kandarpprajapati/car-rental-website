/**
 * Generates email content for customer and admin.
 *
 * @param {Object} bookingDetails - Booking details object.
 * @param {string} userEmail - User Email of the customer.
 * @returns {Object} - An object containing customerEmailContent and adminEmailContent.
 */
const generateEmailContent = (bookingDetails, productName, userEmail) => {
  const {
    time,
    date,
    helper,
    totalPrice,
    phonecode,
    phone,
    deliveryFrom,
    deliveryTo,
  } = bookingDetails;

  const customerEmailContent = `
      <h1>Booking Confirmation</h1>
      <p>Dear Customer,</p>
      <p>Thank you for your booking. Here are the details:</p>
      <ul>
        <li>Product: ${productName}</li>
        <li>Date: ${new Date(date).toLocaleDateString()}</li>
        <li>Time Slots: ${time.join(", ")}</li>
        <li>Delivery From: ${deliveryFrom}</li>
        <li>Delivery To: ${deliveryTo}</li>
        <li>Total Price: €${totalPrice}</li>
        <li>Helper: ${helper ? "Yes" : "No"}</li>
        <li>Phone: ${phonecode} ${phone}</li>
      </ul>
      <p>We look forward to serving you!</p>
      <p>Best regards,<br>Your Company</p>
    `;

  const adminEmailContent = `
      <h1>New Booking Alert</h1>
      <p>A new booking has been made:</p>
      <ul>
        <li>User ID: ${userEmail}</li>
        <li>Product: ${productName}</li>
        <li>Date: ${new Date(date).toLocaleDateString()}</li>
        <li>Time Slots: ${time.join(", ")}</li>
        <li>Delivery From: ${deliveryFrom}</li>
        <li>Delivery To: ${deliveryTo}</li>
        <li>Total Price: €${totalPrice}</li>
        <li>Helper: ${helper ? "Yes" : "No"}</li>
        <li>Phone: ${phonecode} ${phone}</li>
      </ul>
    `;

  return { customerEmailContent, adminEmailContent };
};

module.exports = generateEmailContent;
