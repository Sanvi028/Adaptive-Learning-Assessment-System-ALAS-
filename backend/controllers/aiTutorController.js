const UserPerformance = require("../models/UserPerformance");
const GeneratedQuestion = require("../models/GeneratedQuestion");
const { generateAIQuestions } = require("../services/aiServices");

exports.generateQuestions = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "UserId required" });
    }

    const performance = await UserPerformance.find({ userId });

    if (!performance.length) {
      return res.status(404).json({ message: "No performance data found" });
    }

    const weakTopics = performance
      .filter(p => p.accuracy < 50)
      .map(p => p.topic);

    if (!weakTopics.length) {
      return res.json({
        message: "No weak topics found. User is performing well."
      });
    }

    const topic = weakTopics[0];

    const generatedQuestions = await generateAIQuestions(topic);

    const savedQuestions = await GeneratedQuestion.insertMany(
      generatedQuestions.map(q => ({
        userId,
        topic,
        difficulty: q.difficulty || "easy",
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    );

    return res.status(200).json({
      topicSelected: topic,
      count: savedQuestions.length,
      questions: savedQuestions
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}; 

