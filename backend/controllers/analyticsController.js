const QuizAttempt = require("../models/QuizAttempt");

exports.getTrends = async (req, res) => {
  try {
    const userId = req.user.userId;

    const attempts = await QuizAttempt.find({ userId });

    // Step 1: group data by date
    const dailyMap = {};

    attempts.forEach((attempt) => {
      const date = attempt.createdAt.toISOString().split("T")[0];

      if (!dailyMap[date]) {
        dailyMap[date] = { total: 0, correct: 0 };
      }

      dailyMap[date].total += 1;

      if (attempt.isCorrect) {
        dailyMap[date].correct += 1;
      }
    });

    // Step 2: convert object → arrays
    const dailyAttempts = [];
    const dailyAccuracy = [];

    Object.keys(dailyMap).forEach((date) => {
      const data = dailyMap[date];

      dailyAttempts.push({
        date,
        count: data.total,
      });

      dailyAccuracy.push({
        date,
        accuracy:
          data.total > 0
            ? (data.correct / data.total) * 100
            : 0,
      });
    });

    // Step 3: send response
    return res.json({
      success: true,
      data: {
        dailyAttempts,
        dailyAccuracy,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};