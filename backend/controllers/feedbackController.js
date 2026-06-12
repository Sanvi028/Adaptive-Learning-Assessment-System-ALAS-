const UserPerformance = require("../models/UserPerformance");

exports.getFeedback = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Step 1: fetch performance data
    const performance = await UserPerformance.find({ userId });

    // Step 2: classify topics
    const weakTopics = [];
    const strongTopics = [];

    performance.forEach((item) => {
      if (item.accuracy < 60) {
        weakTopics.push(item.topic);
      } 
      else if (item.accuracy >= 80) {
        strongTopics.push(item.topic);
      }
    });

    // Step 3: generate suggestions
    const suggestions = [];

    weakTopics.forEach((topic) => {
      suggestions.push(
        `Revise ${topic} basics and practice MCQs daily`
      );
    });

    strongTopics.forEach((topic) => {
      suggestions.push(
        `You are strong in ${topic}, try advanced problems`
      );
    });

    // Step 4: response
    return res.json({
      success: true,
      data: {
        weakTopics,
        strongTopics,
        suggestions
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};