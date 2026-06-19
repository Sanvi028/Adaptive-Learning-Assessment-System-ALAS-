const Question = require("../models/Questions");
const QuizAttempt = require("../models/QuizAttempt");

const generateRecommendations = async (userId) => {
  const attempts = await QuizAttempt.find({ userId });

  if (!attempts.length) {
    return {
      weakTopics: [],
      recommendations: {
        reinforce: [],
        practice: [],
        challenge: [],
      },
    };
  }

  const topicMap = new Map();

  for (const attempt of attempts) {
    const key = attempt.topic || "general";

    if (!topicMap.has(key)) {
      topicMap.set(key, {
        correct: 0,
        total: 0,
      });
    }

    const data = topicMap.get(key);

    data.total += 1;

    if (attempt.isCorrect) {
      data.correct += 1;
    }
  }

  const weakTopics = [];

  topicMap.forEach((value, topic) => {
    const accuracy = (value.correct / value.total) * 100;

    if (accuracy < 60) {
      weakTopics.push(topic);
    }
  });

  const reinforce = await Question.find({
    topic: { $in: weakTopics },
    difficulty: "easy",
  }).limit(10);

  const practice = await Question.find({
    topic: { $in: weakTopics },
    difficulty: "medium",
  }).limit(10);

  const challenge = await Question.find({
    topic: { $in: weakTopics },
    difficulty: "hard",
  }).limit(5);

  return {
    weakTopics,
    recommendations: {
      reinforce,
      practice,
      challenge,
    },
  };
};

module.exports = {
  generateRecommendations,
};