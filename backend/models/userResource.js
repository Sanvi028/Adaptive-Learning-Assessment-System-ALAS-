const mongoose = require("mongoose");

const userResourceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    content: {
      type: String, // extracted text from PDF / input
      required: true,
    },

    extractedTopics: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserResource", userResourceSchema);