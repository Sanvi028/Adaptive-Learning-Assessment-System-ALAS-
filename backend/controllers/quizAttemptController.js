const QuizAttempt = require("../models/QuizAttempt");
const UserPerformance = require("../models/UserPerformance");
const Question = require("../models/Questions");

exports.submitQuiz = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "answers required",
      });
    }

    let score = 0;
    const topicsSet = new Set();

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);

      if (!question) continue;
const selected =
  ans.selectedAnswer || ans.selectedOption || "";

const isCorrect =
  question.correctAnswer?.trim() === selected?.trim();
      if (isCorrect) score++;

      topicsSet.add(question.topic || "general");

      // store attempt log
      await QuizAttempt.create({
        userId,
        questionId: question._id,
        userAnswer: ans.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        topic: question.topic,
      });

      // update aggregated performance
      await UserPerformance.findOneAndUpdate(
        { userId, topic: question.topic },
        {
          $inc: {
            totalQuestions: 1,
            correctAnswers: isCorrect ? 1 : 0,
            wrongAnswers: isCorrect ? 0 : 1,
          },
          $set: {
            lastAttemptedAt: new Date(),
          },
        },
        { upsert: true, new: true }
      );
    }

    const totalQuestions = answers.length;
    const accuracy =
      totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    res.json({
      success: true,
      message: "Quiz submitted successfully",
      data: {
        score,
        totalQuestions,
        accuracy,
        topicsCovered: [...topicsSet],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};