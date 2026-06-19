const UserResource = require("../models/UserResource");
const Question = require("../models/Questions");

const {
  extractTopics,
  generateQuizFromResource,
} = require("../services/resourceEngineService");

/* -----------------------------
   UPLOAD RESOURCE + GENERATE QUIZ
------------------------------*/
const createResourceAndQuiz = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, content, difficulty } = req.body;

    // 1. Save resource
    const resource = await UserResource.create({
      userId,
      title,
      content,
      difficultyPreference: difficulty || "easy",
    });

    // 2. Extract topics using AI
    const topics = await extractTopics(content);

    resource.extractedTopics = topics;
    await resource.save();

    // 3. Generate quiz from extracted topics
    const questions = await generateQuizFromResource(
      topics,
      difficulty || "easy"
    );

    // 4. Save questions to DB
    const savedQuestions = await Question.insertMany(
      questions.map((q) => ({
        ...q,
        difficulty: difficulty || "easy",
      }))
    );

    return res.json({
      success: true,
      message: "Resource processed and quiz generated",
      data: {
        resource,
        quiz: savedQuestions,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createResourceAndQuiz,
};