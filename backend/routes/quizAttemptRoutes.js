const express = require("express");
const router = express.Router();

const { submitQuiz } = require("../controllers/quizAttemptController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ MUST HAVE AUTH MIDDLEWARE HERE
router.post("/submit", authMiddleware, submitQuiz);

module.exports = router;