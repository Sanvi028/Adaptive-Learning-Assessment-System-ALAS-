const express = require("express");
const router = express.Router();

const {
  createOrUpdateProfile,
  getProfile,
} = require("../controllers/userProfileController");

const authMiddleware = require("../middleware/authMiddleware");

// create or update
router.post("/", authMiddleware, createOrUpdateProfile);

// get profile
router.get("/", authMiddleware, getProfile);

module.exports = router;