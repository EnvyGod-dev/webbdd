import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import "../style.css";

const subjects = [
    { id: 1, subjectName: "Математик", submissionRate: "85%", teacher: "Бат-Эрдэнэ", totalStudents: 25 },
    { id: 2, subjectName: "Төслийн менежмент", submissionRate: "78%", teacher: "Сарангэрэл", totalStudents: 20 },
    { id: 3, subjectName: "Системийн шинжилгээ", submissionRate: "90%", teacher: "Төгөлдөр", totalStudents: 18 },
    { id: 4, subjectName: "Програмчлалын үндэс", submissionRate: "88%", teacher: "Мөнхзул", totalStudents: 22 },
    { id: 5, subjectName: "Сүлжээний аюулгүй байдал", submissionRate: "92%", teacher: "Энхтуяа", totalStudents: 15 },
    { id: 6, subjectName: "Мэдээллийн технологи", submissionRate: "81%", teacher: "Ганзориг", totalStudents: 20 },
    { id: 7, subjectName: "Физик", submissionRate: "75%", teacher: "Сувд", totalStudents: 18 },
    { id: 8, subjectName: "Англи хэл", submissionRate: "87%", teacher: "Оюунчимэг", totalStudents: 25 },
    { id: 9, subjectName: "Экологи", submissionRate: "83%", teacher: "Баярмаа", totalStudents: 17 },
];

const LAB_COUNT = 10;
const ASSIGNMENT_COUNT = 2;

function generateStudentsWithSubmissions(total) {
    // Each student can submit each lab and each assignment
    const students = [];
    for (let i = 0; i < total; i++) {
        const name = `Оюутан ${i + 1}`;
        // Labs: each lab has a sent status
        const labs = Array.from({ length: LAB_COUNT }, (_, labIdx) => ({
            lab: labIdx + 1,
            sent: ((i + labIdx) * 7) % 3 !== 0, // deterministic "random"
        }));
        // Assignments: each assignment has a sent status
        const assignments = Array.from({ length: ASSIGNMENT_COUNT }, (_, aIdx) => ({
            assignment: aIdx + 1,
            sent: ((i + aIdx) * 5) % 2 !== 0,
        }));
        students.push({ name, labs, assignments });
    }
    return students;
}

const SubmissionDetails = () => {
    const { id } = useParams();
    const subject = subjects.find((s) => s.id === parseInt(id));
    const [workType, setWorkType] = useState("lab");
    const [sentStatus, setSentStatus] = useState("sent");
    const [labNumber, setLabNumber] = useState(1);
    const [assignmentNumber, setAssignmentNumber] = useState(1);

    // Memoize students so they don't change on every render
    const students = useMemo(
        () => (subject ? generateStudentsWithSubmissions(subject.totalStudents) : []),
        [subject]
    );

    if (!subject) {
        return (
            <div className="submission-details-container">
                <h2 className="submission-details-header">Хичээл олдсонгүй</h2>
                <div className="submission-details-back">
                    <Link to="/dashboard">Буцах</Link>
                </div>
            </div>
        );
    }

    // Filter students based on dropdowns
    let filteredStudents = [];
    if (workType === "lab") {
        filteredStudents = students.filter((student) => {
            const lab = student.labs.find(l => l.lab === labNumber);
            return lab && (sentStatus === "sent" ? lab.sent : !lab.sent);
        });
    } else {
        filteredStudents = students.filter((student) => {
            const assignment = student.assignments.find(a => a.assignment === assignmentNumber);
            return assignment && (sentStatus === "sent" ? assignment.sent : !assignment.sent);
        });
    }

    return (
        <div className="submission-details-container">
            <h2 className="submission-details-header">
                <strong>{subject.subjectName}</strong> - Илгээсэн ажлын дэлгэрэнгүй
            </h2>
            <div className="submission-details-meta">
                <div><strong>Багш:</strong> {subject.teacher}</div>
                <div><strong>Илгээсэн хувь:</strong> {subject.submissionRate}</div>
                <div><strong>Нийт оюутан:</strong> {subject.totalStudents}</div>
            </div>
            <div className="submission-details-select" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <div>
                    <label htmlFor="workType">Ажлын төрөл:</label>
                    <select
                        id="workType"
                        value={workType}
                        onChange={e => setWorkType(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    >
                        <option value="lab">Лабораторийн ажил</option>
                        <option value="assignment">Бие даалт</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sentStatus">Статус:</label>
                    <select
                        id="sentStatus"
                        value={sentStatus}
                        onChange={e => setSentStatus(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    >
                        <option value="sent">Илгээсэн</option>
                        <option value="unsent">Илгээгүй</option>
                    </select>
                </div>
                {workType === "lab" && (
                    <div>
                        <label htmlFor="labNumber">Лаб №:</label>
                        <select
                            id="labNumber"
                            value={labNumber}
                            onChange={e => setLabNumber(Number(e.target.value))}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            {Array.from({ length: LAB_COUNT }).map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}-р лаборатори
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {workType === "assignment" && (
                    <div>
                        <label htmlFor="assignmentNumber">Бие даалт №:</label>
                        <select
                            id="assignmentNumber"
                            value={assignmentNumber}
                            onChange={e => setAssignmentNumber(Number(e.target.value))}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            {Array.from({ length: ASSIGNMENT_COUNT }).map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}-р бие даалт
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div className="submission-details-columns">
                <div className="submission-details-column">
                    <h4>
                        {sentStatus === "sent" ? "Илгээсэн" : "Илгээгүй"} оюутнууд
                    </h4>
                    <ul>
                        {filteredStudents.length === 0 && <li>Оюутан байхгүй</li>}
                        {filteredStudents.map((s, i) => (
                            <li key={i}>{s.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="submission-details-back">
                <Link to="/team2/dashboard/">Буцах</Link>
            </div>
        </div>
    );
};

export default SubmissionDetails;