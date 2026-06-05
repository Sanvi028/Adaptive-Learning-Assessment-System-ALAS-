const QuizAttempt = require("../models/QuizAttempt");
const UserPerformance = require("../models/UserPerformance");

exports.submitQuiz = async (req, res) => {
  try {
    // ✅ SAFE USER ID
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }

    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "answers must be a non-empty array"
      });
    }

    let score = 0;
    let topicsSet = new Set();

    for (const ans of answers) {
      const {
        questionId,
        selectedAnswer,
        correctAnswer,
        topic
      } = ans;

      const safeTopic = topic || "general";
      const isCorrect = selectedAnswer === correctAnswer;

      if (isCorrect) score++;
      topicsSet.add(safeTopic);

      // ✅ SAVE ATTEMPT
      await QuizAttempt.create({
        userId,
        questionId,
        userAnswer: selectedAnswer,
        correctAnswer,
        isCorrect,
        topic: safeTopic
      });

      // ✅ SAFE PERFORMANCE UPDATE
      await UserPerformance.findOneAndUpdate(
        { userId, topic: safeTopic },
        {
          $inc: {
            totalQuestions: 1,
            correctAnswers: isCorrect ? 1 : 0,
            wrongAnswers: isCorrect ? 0 : 1
          },
          $set: {
            lastAttemptedAt: new Date()
          }
        },
        { upsert: true, new: true }
      );
    }

    // ✅ SAFE ACCURACY CALCULATION (NO NaN EVER)
    const totalQuestions = answers.length;
    const accuracy =
      totalQuestions > 0
        ? (score / totalQuestions) * 100
        : 0;

    return res.json({
      success: true,
      message: "Quiz submitted successfully",
      data: {
        score,
        totalQuestions,
        accuracy,
        topicsCovered: [...topicsSet]
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};