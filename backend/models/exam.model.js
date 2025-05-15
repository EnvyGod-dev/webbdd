const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: {
    hour: Number,
    minute: Number,
  },
  questions: [
    {
      question: String,
      type: String,
      correct: mongoose.Schema.Types.Mixed,
      score: Number,
    },
  ],
});

module.exports = mongoose.model("Exam", examSchema);
