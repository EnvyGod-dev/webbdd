const Exam = require("../models/exam.model");

exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExams = async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
};

exports.getExamById = async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  if (!exam) return res.status(404).json({ error: "Exam not found" });
  res.json(exam);
};

exports.updateExam = async (req, res) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!exam) return res.status(404).json({ error: "Exam not found" });
  res.json(exam);
};

exports.deleteExam = async (req, res) => {
  const result = await Exam.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ error: "Exam not found" });
  res.json({ message: "Exam deleted" });
};