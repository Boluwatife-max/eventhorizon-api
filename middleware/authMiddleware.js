
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token is required",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Support common user ID fields in the JWT payload.
    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      return res.status(401).json({
        message: "Invalid authentication token",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "User account not found",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before accessing this resource",
      });
    }

    req.user = {
      ...decoded,
      id: user._id.toString(),
      isVerified: user.isVerified,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;