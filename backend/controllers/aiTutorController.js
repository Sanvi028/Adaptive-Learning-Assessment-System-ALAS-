const {
  generateTutorResponse,
} = require("../services/aiServices");

/**
 * AI Tutor Controller
 * Only handles HTTP layer (NO business logic here)
 */
exports.aiTutorController = async (req, res) => {
  try {
    const userId = req.user.userId; // from auth middleware
    const { question } = req.body;

    // validation
    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    // call AI service (brain layer)
    const result = await generateTutorResponse(userId, question);

    return res.status(200).json(result);

  } catch (error) {
    console.error("AI Tutor Controller Error:", error.message);

    return res.status(500).json({
      message: "Internal Server Error in AI Tutor",
    });
  }
};

