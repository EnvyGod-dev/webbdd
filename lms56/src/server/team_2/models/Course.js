const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  seats: Number,
  time: String,
  status: String,
  level: String,
});

module.exports = mongoose.model("Course", courseSchema);