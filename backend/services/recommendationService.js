const UserPerformance = require("../models/UserPerformance");
const Question = require("../models/Questions");

/* -----------------------------
   1. GET WEAK TOPICS
------------------------------*/
const getWeakTopics = (performanceData) => {
  const weakTopics = [];

  performanceData.forEach((item) => {
    const accuracy =
      item.totalQuestions > 0
        ? (item.correctAnswers / item.totalQuestions) * 100
        : 0;

    if (accuracy < 60) {
      weakTopics.push({
        topic: item.topic,
        accuracy: Number(accuracy.toFixed(2)),
      });
    }
  });

  return weakTopics;
};

/* -----------------------------
   2. GET STRONG TOPICS
------------------------------*/
const getStrongTopics = (performanceData) => {
  const strongTopics = [];

  performanceData.forEach((item) => {
    const accuracy =
      item.totalQuestions > 0
        ? (item.correctAnswers / item.totalQuestions) * 100
        : 0;

    if (accuracy >= 60) {
      strongTopics.push({
        topic: item.topic,
        accuracy: Number(accuracy.toFixed(2)),
      });
    }
  });

  return strongTopics;
};

/* -----------------------------
   3. SELECT DIFFICULTY
------------------------------*/
const getRecommendedDifficulty = (accuracy) => {
  if (accuracy < 40) return "easy";
  if (accuracy < 70) return "medium";
  return "hard";
};

/* -----------------------------
   4. GET NEXT QUESTIONS
------------------------------*/
const getNextQuestions = async (weakTopics) => {
  const recommendations = [];

  for (const topicObj of weakTopics) {
    const difficulty = getRecommendedDifficulty(topicObj.accuracy);

    const questions = await Question.find({
      topic: topicObj.topic,
      difficulty,
    }).limit(5);

    recommendations.push({
      topic: topicObj.topic,
      difficulty,
      questions,
    });
  }

  return recommendations;
};

/* -----------------------------
   5. MAIN FUNCTION
------------------------------*/
const generateRecommendations = async (userId) => {
  try {
    const performanceData = await UserPerformance.find({ userId });

    if (!performanceData || performanceData.length === 0) {
      return {
        message: "No data available. Take a quiz first.",
        weakTopics: [],
        recommendations: [],
      };
    }

    const weakTopics = getWeakTopics(performanceData);
    const strongTopics = getStrongTopics(performanceData);

    const recommendations = await getNextQuestions(weakTopics);

    return {
      weakTopics,
      strongTopics,
      recommendations,
    };
  } catch (error) {
    console.error("Recommendation Error:", error.message);

    return {
      message: "Failed to generate recommendations",
      weakTopics: [],
      recommendations: [],
    };
  }
};

module.exports = {
  generateRecommendations,
};