import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseSubmissionsTeacher = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [groupFilter, setGroupFilter] = useState("");
    const [teamFilter, setTeamFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/submissions/${courseId}`);
                setSubmissions(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch submissions");
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [courseId]);

    // 🔢 Submission count олох
    const submissionCountMap = submissions.reduce((acc, cur) => {
        acc[cur.student.studentId] = (acc[cur.student.studentId] || 0) + 1;
        return acc;
    }, {});

    const filtered = submissions
        .filter((s) => (groupFilter ? s.student.team === groupFilter : true))
        .filter((s) => (teamFilter ? s.student.team === teamFilter : true))
        .filter((s) => {
            if (statusFilter === "done") return s.score !== null;
            if (statusFilter === "not") return s.score === null;
            return true;
        })
        .filter((s) =>
            searchQuery
                ? s.student.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true
        )
        .sort((a, b) =>
            sortAsc
                ? (a.score ?? 0) - (b.score ?? 0)
                : (b.score ?? 0) - (a.score ?? 0)
        );

    const uniqueTeams = [...new Set(submissions.map((s) => s.student.team))];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F9FBFD] flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F9FBFD] flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FBFD] flex">
            <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Даалгаврын гүйцэтгэл</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-gray-600 hover:text-blue-600"
                    >
                        ← Буцах
                    </button>
                </div>

                <div className="flex flex-wrap gap-3 mb-6 items-center">
                    {["Бие даалт", "Лаборатори", "Нэмэлт даалгавар"].map((g) => (
                        <button
                            key={g}
                            onClick={() => setGroupFilter(g === groupFilter ? "" : g)}
                            className={`px-4 py-2 rounded-full text-sm font-medium shadow transition-all ${groupFilter === g
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600"
                                }`}
                        >
                            {g}
                        </button>
                    ))}

                    <div className="flex items-center gap-2 ml-auto">
                        <input
                            type="text"
                            placeholder="Хайх нэр..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            onChange={(e) => setTeamFilter(e.target.value)}
                            value={teamFilter}
                            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
                        >
                            <option value="">Бүх баг</option>
                            {uniqueTeams.map((team) => (
                                <option key={team} value={team}>
                                    {team}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => setSortAsc(!sortAsc)}
                            className="px-3 py-2 rounded text-sm bg-white border border-gray-300 shadow-sm hover:bg-blue-100"
                        >
                            Үнэлгээ {sortAsc ? "▲" : "▼"}
                        </button>

                        <button
                            onClick={() =>
                                setStatusFilter(statusFilter === "done" ? "" : "done")
                            }
                            className={`px-3 py-2 rounded text-sm font-medium border ${statusFilter === "done"
                                ? "bg-green-100 text-green-700"
                                : "bg-white text-gray-600 border-gray-300"
                                }`}
                        >
                            Дүн тавьсан
                        </button>

                        <button
                            onClick={() =>
                                setStatusFilter(statusFilter === "not" ? "" : "not")
                            }
                            className={`px-3 py-2 rounded text-sm font-medium border ${statusFilter === "not"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-white text-gray-600 border-gray-300"
                                }`}
                        >
                            Дүн тавиагүй
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 font-medium">
                            <tr>
                                <th className="py-2 px-4">Төлөв</th>
                                <th className="py-2 px-4">Нэр</th>
                                <th className="py-2 px-4">Баг</th>
                                <th className="py-2 px-4">Даалгаврын төрөл</th>
                                <th className="py-2 px-4">E-mail</th>
                                <th className="py-2 px-4">Оюутны код</th>
                                <th className="py-2 px-4">Үнэлгээ %</th>
                                <th className="py-2 px-4">Хязгаар</th>
                                <th className="py-2 px-4">Илгээсэн хугацаа</th>
                                <th className="py-2 px-4">Илгээсэн тоо</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s, idx) => {
                                const isLate =
                                    new Date(s.submittedAt) < new Date("2025-02-10T00:00:00");
                                return (
                                    <tr
                                        key={idx}
                                        className={`cursor-pointer ${isLate ? "bg-red-50" : "hover:bg-gray-50"
                                            }`}
                                        onClick={() =>
                                            navigate(`/team2/courses/${courseId}/submissions/${s.student.studentId}`)
                                        }
                                    >
                                        <td
                                            className={`py-2 px-4 text-lg ${s.score !== null ? "text-green-500" : "text-gray-400"
                                                }`}
                                        >
                                            {s.score !== null ? "✔" : "✖"}
                                        </td>
                                        <td className="py-2 px-4">{s.student.name}</td>
                                        <td className="py-2 px-4">{s.student.team}</td>
                                        <td className="py-2 px-4">{s.student.team}</td>
                                        <td className="py-2 px-4">{s.student.email}</td>
                                        <td className="py-2 px-4">{s.student.studentId}</td>
                                        <td className="py-2 px-4">{s.score ?? "-"}</td>
                                        <td className="py-2 px-4">100</td>
                                        <td className="py-2 px-4">{s.submittedAt}</td>
                                        <td className="py-2 px-4">{submissionCountMap[s.student.studentId]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourseSubmissionsTeacher;
