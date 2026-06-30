const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");

// CREATE QUESTION (ADMIN)
router.post("/", async (req, res) => {
  try {
    const {
      questionText,
      options,
      correctAnswer,
      topic,
      difficulty,
      tags,
    } = req.body;

    const question = new Question({
      questionText,
      options,
      correctAnswer,
      topic,
      difficulty,
      tags,
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL QUESTIONS
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;