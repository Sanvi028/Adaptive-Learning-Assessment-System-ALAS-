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

    totalQuestions: {
      type: Number,
      default: 0,
    },

    correctAnswers: {
      type: Number,
      default: 0,
    },

    wrongAnswers: {
      type: Number,
      default: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
    },

    lastAttemptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ensure 1 record per user per topic
userPerformanceSchema.index({ userId: 1, topic: 1 }, { unique: true });

/**
 * ✅ AUTO-FIX ACCURACY BEFORE SAVE
 * prevents NaN forever
 */
userPerformanceSchema.pre("save", function (next) {
  const total = this.totalQuestions;

  if (!total || total === 0) {
    this.accuracy = 0;
  } else {
    this.accuracy =
      (this.correctAnswers / total) * 100;
  }

  next();
});

module.exports = mongoose.model("UserPerformance", userPerformanceSchema);