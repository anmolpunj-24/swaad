const jwt = require("jsonwebtoken");
const user = require("../models/users");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No valid token found!" });
    }

    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.email) {
      return res.status(400).json({ message: "Invalid token payload!" });
    }

    const dbUser = await user.findOne({ email: decodedToken.email });

    if (!dbUser) {
      return res.status(404).json({ message: "User not found in database!" });
    }

    req.user = dbUser;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authentication failed.", error: err.message });
  }
};

module.exports = authenticateUser;
