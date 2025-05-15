const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  email: { type: String, required: true },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  score: { type: Number },
});

module.exports = mongoose.model("Student", studentSchema);
