// middleware/authMiddleware.js

const { verifyToken } = require("../config/jwt");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res
      .status(401)
      .json({
        error: "Invalid or expired token.",
        redirectUrl: req.originalUrl,
      });
  }
};

module.exports = { protect };
