const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  courseId: Number,  // Reference to the course
  group: String,
  type: String,
  present: Number,
  absent: Number
});

module.exports = mongoose.model("Attendance", attendanceSchema); 