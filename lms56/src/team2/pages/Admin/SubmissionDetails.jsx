import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Use the same subjects array as in SubmissionDashboard.jsx, including categories
const subjects = [
    // General Knowledge
    { id: 1, subjectName: "Математик", submissionRate: "85%", teacher: "Бат-Эрдэнэ", totalStudents: 25, category: "general" },
    { id: 7, subjectName: "Физик", submissionRate: "75%", teacher: "Сувд", totalStudents: 18, category: "general" },
    { id: 8, subjectName: "Англи хэл", submissionRate: "87%", teacher: "Оюунчимэг", totalStudents: 25, category: "general" },
    { id: 9, subjectName: "Экологи", submissionRate: "83%", teacher: "Баярмаа", totalStudents: 17, category: "general" },
    { id: 10, subjectName: "Хими", submissionRate: "80%", teacher: "Сараа", totalStudents: 20, category: "general" },

    // Computer Based
    { id: 2, subjectName: "Төслийн менежмент", submissionRate: "78%", teacher: "Сарангэрэл", totalStudents: 20, category: "computer" },
    { id: 3, subjectName: "Системийн шинжилгээ", submissionRate: "90%", teacher: "Төгөлдөр", totalStudents: 18, category: "computer" },
    { id: 4, subjectName: "Програмчлалын үндэс", submissionRate: "88%", teacher: "Мөнхзул", totalStudents: 22, category: "computer" },
    { id: 6, subjectName: "Мэдээллийн технологи", submissionRate: "81%", teacher: "Ганзориг", totalStudents: 20, category: "computer" },
    { id: 11, subjectName: "Өгөгдлийн сан", submissionRate: "89%", teacher: "Батболд", totalStudents: 19, category: "computer" },
    { id: 12, subjectName: "Веб хөгжүүлэлт", submissionRate: "86%", teacher: "Солонго", totalStudents: 21, category: "computer" },

    // Social Based
    { id: 13, subjectName: "Сэтгэл судлал", submissionRate: "82%", teacher: "Эрдэнэчимэг", totalStudents: 23, category: "social" },
    { id: 14, subjectName: "Эдийн засаг", submissionRate: "77%", teacher: "Ганбат", totalStudents: 20, category: "social" },
    { id: 15, subjectName: "Түүх", submissionRate: "84%", teacher: "Мөнхцэцэг", totalStudents: 18, category: "social" },
    { id: 16, subjectName: "Нийгмийн ухаан", submissionRate: "79%", teacher: "Сүхбаатар", totalStudents: 22, category: "social" },

    // Electronic Based
    { id: 17, subjectName: "Цахилгаан хэлхээ", submissionRate: "81%", teacher: "Баярсайхан", totalStudents: 16, category: "electronic" },
    { id: 18, subjectName: "Электроник", submissionRate: "85%", teacher: "Даваадорж", totalStudents: 17, category: "electronic" },
    { id: 19, subjectName: "Микропроцессор", submissionRate: "83%", teacher: "Тэмүүлэн", totalStudents: 15, category: "electronic" },
    { id: 20, subjectName: "Дижитал логик", submissionRate: "88%", teacher: "Энхжаргал", totalStudents: 18, category: "electronic" },

    // Cybersecurity & Network
    { id: 21, subjectName: "Сүлжээний үндэс", submissionRate: "84%", teacher: "Ганболд", totalStudents: 20, category: "network" },
    { id: 22, subjectName: "Кибер аюулгүй байдал", submissionRate: "91%", teacher: "Эрдэнэбаяр", totalStudents: 17, category: "cybersecurity" },
    { id: 23, subjectName: "Мэдээллийн аюулгүй байдал", submissionRate: "87%", teacher: "Төгсжаргал", totalStudents: 19, category: "cybersecurity" },
    { id: 24, subjectName: "Компьютерийн сүлжээ", submissionRate: "89%", teacher: "Бат-Оргил", totalStudents: 18, category: "network" },
    { id: 25, subjectName: "Сүлжээний төхөөрөмж", submissionRate: "82%", teacher: "Сарангуа", totalStudents: 16, category: "network" },
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
    const navigate = useNavigate();
    const subject = subjects.find((s) => s.id === parseInt(id));
    const [workType, setWorkType] = useState("lab");
    const [sentStatus, setSentStatus] = useState("sent");
    const [labNumber, setLabNumber] = useState(1);
    const [assignmentNumber, setAssignmentNumber] = useState(1);

    // For comparison
    const [compareId, setCompareId] = useState("");
    const compareSubject = subjects.find((s) => s.id === Number(compareId) && s.id !== subject?.id);

    // Memoize students so they don't change on every render
    const students = useMemo(
        () => (subject ? generateStudentsWithSubmissions(subject.totalStudents) : []),
        [subject]
    );
    const compareStudents = useMemo(
        () => (compareSubject ? generateStudentsWithSubmissions(compareSubject.totalStudents) : []),
        [compareSubject]
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

    // For comparison subject
    let compareFilteredStudents = [];
    if (compareSubject) {
        if (workType === "lab") {
            compareFilteredStudents = compareStudents.filter((student) => {
                const lab = student.labs.find(l => l.lab === labNumber);
                return lab && (sentStatus === "sent" ? lab.sent : !lab.sent);
            });
        } else {
            compareFilteredStudents = compareStudents.filter((student) => {
                const assignment = student.assignments.find(a => a.assignment === assignmentNumber);
                return assignment && (sentStatus === "sent" ? assignment.sent : !assignment.sent);
            });
        }
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
            <div style={{ margin: "18px 0" }}>
                <button
                    style={{ padding: "8px 16px", borderRadius: 6, background: "#1976d2", color: "#fff", border: "none", cursor: "pointer" }}
                    onClick={() => navigate("/team2/dashboard/compare?a=" + subject.id)}
                >
                    Харьцуулах дэлгэрэнгүй харах
                </button>
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