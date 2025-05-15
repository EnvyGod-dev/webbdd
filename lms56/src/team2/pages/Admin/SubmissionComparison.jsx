import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../style.css";

// Use the same subjects array as in SubmissionDashboard.jsx
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
    const students = [];
    for (let i = 0; i < total; i++) {
        const name = `Оюутан ${i + 1}`;
        const labs = Array.from({ length: LAB_COUNT }, (_, labIdx) => ({
            lab: labIdx + 1,
            sent: ((i + labIdx) * 7) % 3 !== 0,
        }));
        const assignments = Array.from({ length: ASSIGNMENT_COUNT }, (_, aIdx) => ({
            assignment: aIdx + 1,
            sent: ((i + aIdx) * 5) % 2 !== 0,
        }));
        students.push({ name, labs, assignments });
    }
    return students;
}

function SubmissionBarChart({ subjectA, subjectB }) {
    return (
        <div className="comparison-bar-chart">
            {[subjectA, subjectB].map((s, idx) => (
                <div key={s?.id || idx} className="comparison-bar">
                    <div className="comparison-bar-title">{s ? s.subjectName : "..."}</div>
                    <div className="comparison-bar-bg">
                        {s && (
                            <>
                                <div
                                    className={idx === 0 ? "comparison-bar-fill-a" : "comparison-bar-fill-b"}
                                    style={{ width: `${parseInt(s.submissionRate, 10)}%` }}
                                />
                                <span className="comparison-bar-label">{s.submissionRate}</span>
                            </>
                        )}
                    </div>
                    {s && (
                        <div className="comparison-bar-info">
                            <span style={{ fontWeight: "bold" }}>Багш:</span> {s.teacher} <br />
                            <span style={{ fontWeight: "bold" }}>Оюутан:</span> {s.totalStudents}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

const SubmissionComparison = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const aId = Number(params.get("a"));
    const bId = params.get("b") ? Number(params.get("b")) : null;

    const subjectA = subjects.find(s => s.id === aId);
    const subjectB = bId ? subjects.find(s => s.id === bId) : null;

    // For searching and selecting the second subject
    const [search, setSearch] = useState("");
    const filteredSubjects = useMemo(
        () =>
            subjects.filter(
                s =>
                    s.id !== aId &&
                    (s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
                        s.teacher.toLowerCase().includes(search.toLowerCase()))
            ),
        [search, aId]
    );

    // Filter states
    const [workType, setWorkType] = useState("lab");
    const [sentStatus, setSentStatus] = useState("sent");
    const [labNumber, setLabNumber] = useState(1);
    const [assignmentNumber, setAssignmentNumber] = useState(1);

    const studentsA = useMemo(
        () => (subjectA ? generateStudentsWithSubmissions(subjectA.totalStudents) : []),
        [subjectA]
    );
    const studentsB = useMemo(
        () => (subjectB ? generateStudentsWithSubmissions(subjectB.totalStudents) : []),
        [subjectB]
    );

    // If no subjectA, show error
    if (!subjectA) {
        return (
            <div className="comparison-container">
                <h2 className="comparison-header">Хичээл олдсонгүй</h2>
                <div className="comparison-back">
                    <Link to="/team2/dashboard/">Буцах</Link>
                </div>
            </div>
        );
    }

    // If subjectB is not chosen, show search and select UI
    if (!subjectB) {
        return (
            <div className="comparison-container">
                <h2 className="comparison-header">Харьцуулах хичээл сонгох</h2>
                <div style={{ display: "flex", justifyContent: "center", gap: 40, alignItems: "flex-start", marginBottom: 24 }}>
                    {/* First subject info */}
                    <table className="comparison-subject-table">
                        <tbody>
                            <tr>
                                <th colSpan={2} style={{ background: "#1976d2", color: "#fff", fontSize: 20, textAlign: "center", borderRadius: "8px 8px 0 0" }}>
                                    <span style={{ fontWeight: "bold", letterSpacing: 1 }}>{subjectA.subjectName}</span>
                                </th>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold" }}>Багш</td>
                                <td style={{ color: "#1976d2", fontWeight: "bold" }}>{subjectA.teacher}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold" }}>Илгээсэн хувь</td>
                                <td>{subjectA.submissionRate}</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: "bold" }}>Оюутан</td>
                                <td>{subjectA.totalStudents}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Search and list on the right */}
                    <div>
                        <div style={{ marginBottom: 16, textAlign: "center" }}>
                            <input
                                type="text"
                                placeholder="Хоёр дахь хичээлийн нэр эсвэл багш хайх..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: 6,
                                    border: "1px solid #ccc",
                                    width: 300,
                                    fontSize: 16
                                }}
                            />
                        </div>
                        <div style={{ maxHeight: 260, overflowY: "auto", marginBottom: 24 }}>
                            <table className="comparison-subject-table" style={{ minWidth: 340 }}>
                                <tbody>
                                    {filteredSubjects.length === 0 && (
                                        <tr>
                                            <td colSpan={2} style={{ textAlign: "center", color: "#e53935" }}>Хичээл олдсонгүй</td>
                                        </tr>
                                    )}
                                    {filteredSubjects.map(s => (
                                        <tr key={s.id} style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/team2/dashboard/compare?a=${aId}&b=${s.id}`)}
                                        >
                                            <td>
                                                <span style={{ fontWeight: "bold", color: "#1976d2" }}>{s.subjectName}</span>
                                                <div style={{ fontSize: 13, color: "#888" }}>{s.teacher}</div>
                                            </td>
                                            <td style={{ textAlign: "right" }}>{s.submissionRate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="comparison-back">
                    <Link to="/team2/dashboard/">Буцах</Link>
                </div>
            </div>
        );
    }

    // Filter students for both subjects
    let filteredA = [];
    let filteredB = [];
    if (workType === "lab") {
        filteredA = studentsA.filter((student) => {
            const lab = student.labs.find(l => l.lab === labNumber);
            return lab && (sentStatus === "sent" ? lab.sent : !lab.sent);
        });
        filteredB = studentsB.filter((student) => {
            const lab = student.labs.find(l => l.lab === labNumber);
            return lab && (sentStatus === "sent" ? lab.sent : !lab.sent);
        });
    } else {
        filteredA = studentsA.filter((student) => {
            const assignment = student.assignments.find(a => a.assignment === assignmentNumber);
            return assignment && (sentStatus === "sent" ? assignment.sent : !assignment.sent);
        });
        filteredB = studentsB.filter((student) => {
            const assignment = student.assignments.find(a => a.assignment === assignmentNumber);
            return assignment && (sentStatus === "sent" ? assignment.sent : !assignment.sent);
        });
    }

    return (
        <div className="comparison-container">
            <h2 className="comparison-header">Хичээлүүдийн харьцуулалт</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 24 }}>
                <table className="comparison-subject-table">
                    <tbody>
                        <tr>
                            <th colSpan={2} style={{ background: "#1976d2", color: "#fff", fontSize: 20, textAlign: "center", borderRadius: "8px 8px 0 0" }}>
                                <span style={{ fontWeight: "bold", letterSpacing: 1 }}>{subjectA.subjectName}</span>
                            </th>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Багш</td>
                            <td style={{ color: "#1976d2", fontWeight: "bold" }}>{subjectA.teacher}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Илгээсэн хувь</td>
                            <td>{subjectA.submissionRate}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Оюутан</td>
                            <td>{subjectA.totalStudents}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="comparison-subject-table">
                    <tbody>
                        <tr>
                            <th colSpan={2} style={{ background: "#4caf50", color: "#fff", fontSize: 20, textAlign: "center", borderRadius: "8px 8px 0 0" }}>
                                <span style={{ fontWeight: "bold", letterSpacing: 1 }}>{subjectB.subjectName}</span>
                            </th>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Багш</td>
                            <td style={{ color: "#4caf50", fontWeight: "bold" }}>{subjectB.teacher}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Илгээсэн хувь</td>
                            <td>{subjectB.submissionRate}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Оюутан</td>
                            <td>{subjectB.totalStudents}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <SubmissionBarChart subjectA={subjectA} subjectB={subjectB} />

            {/* Filters */}
            <div className="submission-details-select" style={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "center", margin: "24px 0" }}>
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

            {/* Comparison lists */}
            <div className="comparison-lab">
                <h4>
                    {workType === "lab"
                        ? `Лаб ${labNumber} - ${sentStatus === "sent" ? "Илгээсэн" : "Илгээгээгүй"} оюутны тоо`
                        : `Бие даалт ${assignmentNumber} - ${sentStatus === "sent" ? "Илгээсэн" : "Илгээгээгүй"} оюутны тоо`}
                </h4>
                <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
                    <table className="comparison-student-table">
                        <thead>
                            <tr>
                                <th colSpan={1} style={{ background: "#1976d2", color: "#fff", textAlign: "center" }}>
                                    {subjectA.subjectName}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>{filteredA.length} / {subjectA.totalStudents}</strong>
                                </td>
                            </tr>
                            {filteredA.length === 0 && (
                                <tr>
                                    <td>Оюутан байхгүй</td>
                                </tr>
                            )}
                            {filteredA.map((s, i) => (
                                <tr key={i}>
                                    <td>{s.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className="comparison-student-table">
                        <thead>
                            <tr>
                                <th colSpan={1} style={{ background: "#4caf50", color: "#fff", textAlign: "center" }}>
                                    {subjectB.subjectName}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>{filteredB.length} / {subjectB.totalStudents}</strong>
                                </td>
                            </tr>
                            {filteredB.length === 0 && (
                                <tr>
                                    <td>Оюутан байхгүй</td>
                                </tr>
                            )}
                            {filteredB.map((s, i) => (
                                <tr key={i}>
                                    <td>{s.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="comparison-back">
                <Link to="/team2/dashboard/">Буцах</Link>
            </div>
        </div>
    );
};

export default SubmissionComparison;