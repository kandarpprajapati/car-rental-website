// config/jwt.js

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./env");

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2m" });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
