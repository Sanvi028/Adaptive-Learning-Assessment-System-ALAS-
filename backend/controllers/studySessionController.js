const StudySession = require("../models/StudySession");

const createSession = async (req, res) => {
  try {
    // ✅ Use project standard
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const { type, topic, duration, accuracy, notes } = req.body;

    const session = await StudySession.create({
      userId,
      type,
      topic,
      duration,
      accuracy,
      notes,
    });

    return res.status(201).json({
      success: true,
      message: "Study session created successfully",
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
};