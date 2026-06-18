const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { aiTutorController } = require("../controllers/aiTutorController");

/**
 * AI Tutor Route
 * POST /api/ai-tutor
 * Protected route (JWT required)
 */
router.post("/", authMiddleware, aiTutorController);

module.exports = router;