// server.js

const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./config/env");

// Connect to MongoDB and start the server
(async () => {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} and time is ${new Date()}`
      );
    });
  });
})();
