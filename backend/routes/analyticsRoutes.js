const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getTrends } = require("../controllers/analyticsController");

// GET /api/analytics/trends
router.get("/trends", authMiddleware, getTrends);

module.exports = router;