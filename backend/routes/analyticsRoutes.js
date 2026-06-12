const express = require("express");
const router = express.Router();

const UserPerformance = require("../models/UserPerformance");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getSummary
} = require("../controllers/analyticsController");

// GET WEAK TOPICS (AUTHENTICATED USER ONLY)
router.get("/weak", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }

    const userId = req.user.userId;

    const weakTopics = await UserPerformance.find({
      userId,
      accuracy: { $lt: 60 }
    });

    return res.json({
      success: true,
      count: weakTopics.length,
      data: weakTopics
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get(
  "/summary",
  authMiddleware,
  getSummary
);

module.exports = router;

