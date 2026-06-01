const UserProfile = require("../models/UserProfile");

// CREATE OR UPDATE profile
const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fullName, bio, skills, goal, level } = req.body;

    let profile = await UserProfile.findOne({ userId });

    if (profile) {
      // update existing profile
      profile.fullName = fullName || profile.fullName;
      profile.bio = bio || profile.bio;
      profile.skills = skills || profile.skills;
      profile.goal = goal || profile.goal;
      profile.level = level || profile.level;

      await profile.save();

      return res.json(profile);
    }

    // create new profile
    profile = await UserProfile.create({
      userId,
      fullName,
      bio,
      skills,
      goal,
      level,
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET profile
const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfile,
};