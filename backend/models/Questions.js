const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message: "Exactly 4 options are required",
      },
    },

    correctAnswer: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
      index: true, // IMPORTANT for adaptive filtering
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
      index: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    timesAttempted: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Compound index for fast adaptive queries
questionSchema.index({ topic: 1, difficulty: 1 });

module.exports = mongoose.model("Question", questionSchema);