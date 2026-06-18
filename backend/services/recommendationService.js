const Question = require("../models/Questions");
const UserPerformance = require("../models/UserPerformance");

/**
 * 1. Get user weak/strong topics
 */
const getUserProfile = async (userId) => {
  const data = await UserPerformance.find({ userId });

  const weakTopics = [];
  const strongTopics = [];

  data.forEach((item) => {
    const accuracy = item.accuracy || 0;

    if (accuracy < 60) {
      weakTopics.push(item.topic);
    } else if (accuracy >= 85) {
      strongTopics.push(item.topic);
    }
  });

  return { weakTopics, strongTopics };
};

/**
 * 2. Fetch questions based on difficulty
 */
const getQuestionsByTopics = async (topics, difficulty, limit = 5) => {
  return await Question.find({
    topic: { $in: topics },
    difficulty,
  }).limit(limit);
};

/**
 * 3. MAIN RECOMMENDATION ENGINE
 */
const generateRecommendations = async (userId) => {
  const { weakTopics, strongTopics } = await getUserProfile(userId);

  // Weak → EASY questions
  const weakEasyQuestions = await getQuestionsByTopics(
    weakTopics,
    "easy",
    5
  );

  // Weak → MEDIUM reinforcement
  const weakMediumQuestions = await getQuestionsByTopics(
    weakTopics,
    "medium",
    5
  );

  // Strong → HARD challenge
  const strongHardQuestions = await getQuestionsByTopics(
    strongTopics,
    "hard",
    5
  );

  return {
    weakTopics,
    strongTopics,

    recommendations: {
      reinforce: weakEasyQuestions,
      practice: weakMediumQuestions,
      challenge: strongHardQuestions,
    },

    roadmap: [
      "Start with weak topics (easy questions)",
      "Move to medium difficulty practice",
      "Attempt hard questions for strong topics",
    ],
  };
};

module.exports = {
  generateRecommendations,
};