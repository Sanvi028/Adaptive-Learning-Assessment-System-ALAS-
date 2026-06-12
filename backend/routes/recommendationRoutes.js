const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getFeedback } = require("../controllers/feedbackController");

router.get("/feedback", authMiddleware, getFeedback);

module.exports = router;