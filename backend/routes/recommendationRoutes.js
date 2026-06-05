const express = require("express");
const router = express.Router();

const UserPerformance = require("../models/UserPerformance");
const Question = require("../models/Questions");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user"
      });
    }

    const userId = req.user.userId;

    const performance = await UserPerformance.find({ userId });

    // STEP 1: compute weakness score per topic
    const scored = performance.map((p) => {
      const total = p.totalQuestions || 0;
      const correct = p.correctAnswers || 0;
      const incorrect = p.wrongAnswers || 0;

      const accuracy = total === 0 ? 0 : (correct / total) * 100;

      // 🔥 PERSONALIZED WEAKNESS MODEL
      const weaknessScore =
        (incorrect * 2) +
        (accuracy < 50 ? 5 : 0) +
        (accuracy < 70 ? 2 : 0);

      return {
        topic: p.topic,
        accuracy,
        weaknessScore,
        totalQuestions: total,
      };
    });

    // STEP 2: sort weakest topics first
    scored.sort((a, b) => b.weaknessScore - a.weaknessScore);

    // STEP 3: pick top weak topics
    const topWeakTopics = scored.slice(0, 3);

    // STEP 4: extract topic names
    const topicNames = topWeakTopics.map((t) => t.topic);

    // STEP 5: fetch personalized questions
    const questions = await Question.find({
      topic: { $in: topicNames },
    }).limit(10);

    return res.json({
      success: true,
      weakTopics: topWeakTopics,
      recommendedQuestions: questions,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;