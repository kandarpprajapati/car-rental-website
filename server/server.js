// server.js

const app = require("./app");
const { connectDB } = require("./config/db");
const { PORT } = require("./config/env");

require("dotenv").config();

// Connect to MongoDB and start the server
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
