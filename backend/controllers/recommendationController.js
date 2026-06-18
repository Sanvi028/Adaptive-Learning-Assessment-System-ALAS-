const {
  generateRecommendations,
} = require("../services/recommendationService");

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await generateRecommendations(userId);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};