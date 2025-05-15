const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,  // Reference to the course
  name: String,
  time: String
});

module.exports = mongoose.model("Lesson", lessonSchema); 