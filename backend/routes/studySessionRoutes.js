const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createSession } = require("../controllers/studySessionController");

// CREATE STUDY SESSION
router.post("/", authMiddleware, createSession);

module.exports = router;