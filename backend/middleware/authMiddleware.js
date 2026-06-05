const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1].trim(); // ✅ FIX 1

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SAFETY CHECK (FIX 2)
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload"
      });
    }

    // STANDARD USER OBJECT
    req.user = {
      userId: decoded.userId
    };

    // DEBUG (temporary but useful for your current issue)
    console.log("AUTH SUCCESS USER:", req.user); // ✅ FIX 3

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message
    });
  }
};

module.exports = authMiddleware;