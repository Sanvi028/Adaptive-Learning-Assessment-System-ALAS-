const QuizAttempt = require("../models/QuizAttempt");

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const attempts = await QuizAttempt.find({ userId });

    const totalQuestions = attempts.length;

    const correctAnswers = attempts.filter(
      (attempt) => attempt.isCorrect
    ).length;

    const wrongAnswers = totalQuestions - correctAnswers;

    const accuracy =
      totalQuestions > 0
        ? (correctAnswers / totalQuestions) * 100
        : 0;

    const topicsPracticed = [
      ...new Set(attempts.map((attempt) => attempt.topic))
    ];

    return res.json({
      success: true,
      data: {
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        accuracy,
        topicsPracticed
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};