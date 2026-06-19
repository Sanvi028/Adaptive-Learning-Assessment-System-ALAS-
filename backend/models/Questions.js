const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mcq", "subjective"],
      required: true,
    },

    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      default: undefined, // only for MCQ
    },

    correctAnswer: {
      type: String, // MCQ only OR reference answer
    },

    expectedKeywords: {
      type: [String], // subjective evaluation (MVP)
      default: [],
    },

    topic: {
      type: String,
      required: true,
      index: true,
    },

    subTopic: {
      type: String,
      required: true, // 🔥 IMPORTANT ADDITION
      index: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);