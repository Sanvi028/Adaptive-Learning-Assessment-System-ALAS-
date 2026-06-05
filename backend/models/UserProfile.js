const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String], // example: ["DSA", "React"]
      default: [],
    },

    goal: {
      type: String, // example: "Get 10 LPA job"
      default: "",
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    language: {
    type: String,
    default: "en"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);