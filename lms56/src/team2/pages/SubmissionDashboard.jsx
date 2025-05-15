import React, { useState } from "react";
import { Link } from "react-router-dom";
import PieChart from "../_components/courseSubmissions/PieChart";
import "../style.css";
import DashboardSearchBar from "../_components/courseSubmissions/DashboardSearchBar";

const subjects = [
    {
        id: 1,
        subjectName: "Математик",
        submissionRate: "85%",
        teacher: "Бат-Эрдэнэ",
        totalStudents: 25,
    },
    {
        id: 2,
        subjectName: "Төслийн менежмент",
        submissionRate: "78%",
        teacher: "Сарангэрэл",
        totalStudents: 20,
    },
    {
        id: 3,
        subjectName: "Системийн шинжилгээ",
        submissionRate: "90%",
        teacher: "Төгөлдөр",
        totalStudents: 18,
    },
    {
        id: 4,
        subjectName: "Програмчлалын үндэс",
        submissionRate: "88%",
        teacher: "Мөнхзул",
        totalStudents: 22,
    },
    {
        id: 5,
        subjectName: "Сүлжээний аюулгүй байдал",
        submissionRate: "92%",
        teacher: "Энхтуяа",
        totalStudents: 15,
    },
    {
        id: 6,
        subjectName: "Мэдээллийн технологи",
        submissionRate: "81%",
        teacher: "Ганзориг",
        totalStudents: 20,
    },
    {
        id: 7,
        subjectName: "Физик",
        submissionRate: "75%",
        teacher: "Сувд",
        totalStudents: 18,
    },
    {
        id: 8,
        subjectName: "Англи хэл",
        submissionRate: "87%",
        teacher: "Оюунчимэг",
        totalStudents: 25,
    },
    {
        id: 9,
        subjectName: "Экологи",
        submissionRate: "83%",
        teacher: "Баярмаа",
        totalStudents: 17,
    },
    {
        id: 10,
        subjectName: "Англи хэл II",
        submissionRate: "94%",
        teacher: "Уранбилэг",
        totalStudents: 50,
    },
];

const colors = ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0"];
const pieChartData = subjects.map((subject, i) => ({
    label: subject.subjectName,
    value: subject.totalStudents,
    color: colors[i % colors.length],
}));

const LineGraph = ({ data, labels, width = 900, height = 400 }) => {
    const max = Math.max(...data, 1);
    const yTicks = 5;
    const yStep = max / yTicks;
    const leftPad = 60;
    const bottomPad = 90; // more space for labels
    const topPad = 30;
    const rightPad = 20;
    const chartWidth = width - leftPad - rightPad;
    const chartHeight = height - topPad - bottomPad;

    // Points for the line
    const points = data
        .map((y, i) => {
            const px = leftPad + (i * chartWidth) / (data.length - 1);
            const py = topPad + chartHeight - (y / max) * chartHeight;
            return `${px},${py}`;
        })
        .join(" ");

    return (
        <svg width={width} height={height} style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 6px #eee", marginTop: 24 }}>
            {/* Y axis */}
            <line x1={leftPad} y1={topPad} x2={leftPad} y2={topPad + chartHeight} stroke="#bbb" strokeWidth="1" />
            {/* X axis */}
            <line x1={leftPad} y1={topPad + chartHeight} x2={width - rightPad} y2={topPad + chartHeight} stroke="#bbb" strokeWidth="1" />

            {/* Y axis labels and ticks */}
            {Array.from({ length: yTicks + 1 }).map((_, i) => {
                const yValue = Math.round(max - i * yStep);
                const y = topPad + (chartHeight / yTicks) * i;
                return (
                    <g key={i}>
                        <text x={leftPad - 10} y={y + 4} fontSize="12" textAnchor="end" fill="#666">
                            {yValue}
                        </text>
                        <line x1={leftPad - 4} y1={y} x2={leftPad} y2={y} stroke="#bbb" strokeWidth="1" />
                    </g>
                );
            })}

            {/* X axis labels (angled for readability) */}
            {labels.map((label, i) => {
                const px = leftPad + (i * chartWidth) / (labels.length - 1);
                return (
                    <g key={label}>
                        <text
                            x={px}
                            y={topPad + chartHeight + 30}
                            fontSize="13"
                            textAnchor="end"
                            fill="#444"
                            transform={`rotate(-15,${px},${topPad + chartHeight + 30})`}
                        >
                            {label}
                        </text>
                    </g>
                );
            })}

            {/* Line */}
            <polyline
                fill="none"
                stroke="#1976d2"
                strokeWidth="3"
                points={points}
            />
            {/* Dots */}
            {data.map((y, i) => {
                const px = leftPad + (i * chartWidth) / (data.length - 1);
                const py = topPad + chartHeight - (y / max) * chartHeight;
                return (
                    <circle key={i} cx={px} cy={py} r={5} fill="#1976d2" />
                );
            })}

            {/* Axis titles */}
            <text x={width / 2} y={height - 15} fontSize="15" textAnchor="middle" fill="#222">

            </text>
            <text
                x={20}
                y={height / 2}
                fontSize="15"
                textAnchor="middle"
                fill="#222"
                transform={`rotate(-90,20,${height / 2})`}
            >
                Илгээсэн ажлын тоо (Y)
            </text>
        </svg>
    );
};

const SubmissionDashboard = () => {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("default"); // default, name, sent, total

    // Filter subjects by search (case-insensitive, matches subject name or teacher)
    let filteredSubjects = subjects.filter(
        (subject) =>
            subject.subjectName.toLowerCase().includes(search.toLowerCase()) ||
            subject.teacher.toLowerCase().includes(search.toLowerCase())
    );

    // Sort logic
    if (sortBy === "name") {
        filteredSubjects = [...filteredSubjects].sort((a, b) =>
            a.subjectName.localeCompare(b.subjectName, "mn")
        );
    } else if (sortBy === "sent") {
        filteredSubjects = [...filteredSubjects].sort(
            (a, b) =>
                parseInt(b.submissionRate, 10) - parseInt(a.submissionRate, 10)
        );
    } else if (sortBy === "total") {
        filteredSubjects = [...filteredSubjects].sort(
            (a, b) => b.totalStudents - a.totalStudents
        );
    }

    return (
        <div className="dashboard-container">
            <div className="subject-list-section">
                <h2>Хичээлийн даалгавар илгээлт дашбоард</h2>
                <DashboardSearchBar onSearch={setSearch} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span>Эрэмбэлэх:</span>
                    <button
                        onClick={() => setSortBy("default")}
                        style={{
                            background: sortBy === "default" ? "#1976d2" : "#eee",
                            color: sortBy === "default" ? "#fff" : "#222",
                            border: "none",
                            borderRadius: 5,
                            padding: "6px 12px",
                            cursor: "pointer"
                        }}
                    >
                        Default
                    </button>
                    <button
                        onClick={() => setSortBy("name")}
                        style={{
                            background: sortBy === "name" ? "#1976d2" : "#eee",
                            color: sortBy === "name" ? "#fff" : "#222",
                            border: "none",
                            borderRadius: 5,
                            padding: "6px 12px",
                            cursor: "pointer"
                        }}
                    >
                        Хичээлийн нэр
                    </button>
                    <button
                        onClick={() => setSortBy("sent")}
                        style={{
                            background: sortBy === "sent" ? "#1976d2" : "#eee",
                            color: sortBy === "sent" ? "#fff" : "#222",
                            border: "none",
                            borderRadius: 5,
                            padding: "6px 12px",
                            cursor: "pointer"
                        }}
                    >
                        Илгээсэн хувь
                    </button>
                    <button
                        onClick={() => setSortBy("total")}
                        style={{
                            background: sortBy === "total" ? "#1976d2" : "#eee",
                            color: sortBy === "total" ? "#fff" : "#222",
                            border: "none",
                            borderRadius: 5,
                            padding: "6px 12px",
                            cursor: "pointer"
                        }}
                    >
                        Оюутны тоо
                    </button>
                </div>
                <ul className="subject-list">
                    {filteredSubjects.length === 0 ? (
                        <li style={{ color: "#e53935", fontWeight: "bold", padding: "24px 0", fontSize: 18 }}>
                            Илэрц олдсонгүй
                        </li>
                    ) : (
                        filteredSubjects.map((subject) => {
                            const sentPercent = parseInt(subject.submissionRate, 10);
                            const unsentPercent = 100 - sentPercent;
                            return (
                                <li key={subject.id}>
                                    <Link to={`/team2/dashboard/submission/${subject.id}`}>
                                        {subject.subjectName}
                                    </Link>
                                    <div className="subject-meta">
                                        <span>Багш: {subject.teacher}</span> |{" "}
                                        <span>Илгээсэн хувь: {subject.submissionRate}</span> |{" "}
                                        <span>Нийт оюутан: {subject.totalStudents}</span>
                                    </div>
                                    {/* Submission rate bar chart */}
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginTop: 8,
                                        height: 18,
                                        width: 600,
                                        background: "#eee",
                                        borderRadius: 8,
                                        overflow: "hidden"
                                    }}>
                                        <div
                                            style={{
                                                width: `${sentPercent}%`,
                                                background: "#4caf50",
                                                height: "100%",
                                                transition: "width 0.3s"
                                            }}
                                            title={`Илгээсэн: ${sentPercent}%`}
                                        />
                                        <div
                                            style={{
                                                width: `${unsentPercent}%`,
                                                background: "#e53935",
                                                height: "100%",
                                                transition: "width 0.3s"
                                            }}
                                            title={`Илгээгүй: ${unsentPercent}%`}
                                        />
                                    </div>
                                    <div style={{ fontSize: 12, marginTop: 2 }}>
                                        <span style={{ color: "#4caf50", marginRight: 8 }}>Илгээсэн: {sentPercent}%</span>
                                        <span style={{ color: "#e53935" }}>Илгээгээгүй : {unsentPercent}%</span>
                                    </div>
                                </li>
                            );
                        })
                    )}
                </ul>
                <h3 style={{ marginTop: 32, marginBottom: 8, color: "#1976d2" }}>Илгээсэн ажлын тоо</h3>
                <LineGraph
                    data={filteredSubjects.map((subject) => {
                        const percent = parseInt(subject.submissionRate, 10) / 100;
                        return Math.round(subject.totalStudents * percent);
                    })}
                    labels={filteredSubjects.map((s) => s.subjectName)}
                />
            </div>
            <div className="piechart-section" style={{ minWidth: 540, maxWidth: 700 }}>
                <h3>Хичээлүүдийн нийт оюутан</h3>
                <PieChart data={pieChartData} size={220} />
                <ul className="piechart-legend">
                    {pieChartData.map((data, i) => (
                        <li key={data.label}>
                            <span style={{ background: data.color }} />
                            {data.label}: {data.value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SubmissionDashboard;