const nodemailer = require("nodemailer");
const { ADMIN_EMAIL, ADMIN_EMAIL_PASS } = require("./env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL, // Your email address
    pass: ADMIN_EMAIL_PASS, // Your app password
  },
});

// Verify the transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Error setting up email transporter:", error);
  } else {
    console.log("Email transporter is ready.");
  }
});

module.exports = transporter;
