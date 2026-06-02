const mongoose = require("mongoose");

const userPerformanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      index: true,
    },

    totalAttempted: {
      type: Number,
      default: 0,
    },

    correct: {
      type: Number,
      default: 0,
    },

    incorrect: {
      type: Number,
      default: 0,
    },

    accuracy: {
      type: Number,
      default: 0, // calculated field
    },

    lastAttemptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure one record per user per topic
userPerformanceSchema.index({ userId: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model("UserPerformance", userPerformanceSchema);