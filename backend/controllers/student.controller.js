const Student = require("../models/student.model");
const Exam = require("../models/exam.model");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    const populated = await student.populate("exam", "name");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.find().populate("exam", "name");
  res.json(students);
};

exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id).populate("exam", "name");
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

exports.updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json({ message: "Student deleted" });
};

exports.calculateScore = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("exam");
    if (!student || !student.exam) return res.status(404).json({ error: "Student or Exam not found" });

    const totalScore = student.exam.questions.reduce(
      (sum, q) => sum + (q.score || 0), 0
    );

    student.score = totalScore;
    await student.save();

    res.json({
      message: "Score calculated",
      score: totalScore,
      studentId: student._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};