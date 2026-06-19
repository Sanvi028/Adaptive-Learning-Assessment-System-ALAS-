const QuizAttempt = require("../models/QuizAttempt");
const UserPerformance = require("../models/UserPerformance");

exports.submitQuiz = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { answers } = req.body;

    let score = 0;

    const subTopicMap = new Map();
    const topicsSet = new Set();

    for (const ans of answers) {
      const isCorrect = ans.selectedAnswer === ans.correctAnswer;

      if (isCorrect) score++;

      const subTopic = ans.subTopic || "general";
      const topic = ans.topic || "general";

      topicsSet.add(topic);

      // track subtopic performance
      if (!subTopicMap.has(subTopic)) {
        subTopicMap.set(subTopic, { correct: 0, total: 0 });
      }

      const data = subTopicMap.get(subTopic);
      data.total += 1;
      if (isCorrect) data.correct += 1;

      // save attempt
      await QuizAttempt.create({
        userId,
        questionId: ans.questionId,
        userAnswer: ans.selectedAnswer,
        correctAnswer: ans.correctAnswer,
        isCorrect,
        topic,
        subTopic,
      });

      // update topic-level performance
      await UserPerformance.findOneAndUpdate(
        { userId, topic },
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
    const accuracy = totalQuestions ? (score / totalQuestions) * 100 : 0;

    // weak subtopics
    const weakSubTopics = [];
    const strongSubTopics = [];

    subTopicMap.forEach((v, key) => {
      const acc = (v.correct / v.total) * 100;

      if (acc < 60) weakSubTopics.push({ subTopic: key, accuracy: acc });
      else strongSubTopics.push({ subTopic: key, accuracy: acc });
    });

    return res.json({
      success: true,
      data: {
        score,
        totalQuestions,
        accuracy,
        topicsCovered: [...topicsSet],
        weakSubTopics,
        strongSubTopics,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};