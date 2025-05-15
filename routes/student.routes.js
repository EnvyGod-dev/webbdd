const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.controller");

router.get("/", controller.getAllStudents);
router.post("/", controller.createStudent);
router.get("/:id", controller.getStudentById);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);
router.get("/:id/calculate-score", controller.calculateScore);

module.exports = router;
