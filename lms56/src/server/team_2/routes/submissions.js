const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// Get all submissions for a course
router.get("/:courseId", async (req, res) => {
    try {
        const submissions = await Submission.find({ courseId: req.params.courseId });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single submission with team members
router.get("/:courseId/:studentId", async (req, res) => {
    try {
        // First get the student's submission to find their team
        const studentSubmission = await Submission.findOne({
            courseId: req.params.courseId,
            "student.studentId": req.params.studentId
        });

        if (!studentSubmission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        // Then find all students in the same team
        const teamMembers = await Submission.find({
            courseId: req.params.courseId,
            "student.team": studentSubmission.student.team
        }).select("student");

        // Format the response
        const response = {
            ...studentSubmission.toObject(),
            teamMembers: teamMembers.map(sub => sub.student)
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a submission
router.put("/:courseId/:studentId", async (req, res) => {
    try {
        const { score, grade, feedback } = req.body;
        
        const submission = await Submission.findOneAndUpdate(
            {
                courseId: req.params.courseId,
                "student.studentId": req.params.studentId
            },
            {
                $set: {
                    score,
                    grade,
                    feedback
                }
            },
            { new: true }
        );

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        res.json(submission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 