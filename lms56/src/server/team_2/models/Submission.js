const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  courseId: Number, // This should match the course's id field
  student: {
    name: String,
    team: String,
    email: String,
    studentId: String,
    teammates: [
      {
        name: String,
        team: String,
        email: String,
        studentId: String,
      }
    ]
  },
  submittedAt: String,
  score: Number,
  grade: String,
  feedback: String,
  files: [String],
  type: {
    type: String,
    enum: ["Бие даалт", "Лаборатори", "Нэмэлт даалгавар"],
    required: true
  }
});

module.exports = mongoose.model("Submission", submissionSchema);
