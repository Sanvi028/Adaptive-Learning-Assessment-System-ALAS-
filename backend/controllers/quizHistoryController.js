const QuizAttempt = require("../models/QuizAttempt");

exports.getHistory = async (req, res) => {
  try {
    // ✅ FIX: always use authenticated user
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }

    const userId = req.user.userId;

    const attempts = await QuizAttempt.find({ userId })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: attempts.length,
      data: attempts
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};