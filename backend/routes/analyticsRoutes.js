const express = require("express");
const router = express.Router();

const UserPerformance = require("../models/UserPerformance");

// GET WEAK TOPICS
router.get("/weak/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const weakTopics = await UserPerformance.find({
      userId,
      accuracy: { $lt: 60 },
    });

    res.json({
      success: true,
      count: weakTopics.length,
      data: weakTopics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

