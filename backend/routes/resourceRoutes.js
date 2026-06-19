const express = require("express");
const router = express.Router();
const {
  createResourceAndQuiz,
} = require("../controllers/resourceController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createResourceAndQuiz);

module.exports = router;