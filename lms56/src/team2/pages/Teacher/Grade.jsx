import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const StudentSubmissionPage = () => {
    const navigate = useNavigate();
    const { courseId, studentId } = useParams();
    const [page, setPage] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [score, setScore] = useState(0);
    const [grade, setGrade] = useState("");
    const [feedback, setFeedback] = useState("");
    const [student, setStudent] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);

    // Fetch submission data
    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/submissions/${courseId}/${studentId}`);
                const submissionData = response.data;
                
                setSubmissions([submissionData]); // Since we're getting a single submission
                setStudent(submissionData.student);
                setScore(submissionData.score || 0);
                setGrade(submissionData.grade || "");
                setFeedback(submissionData.feedback || "");
                setTeamMembers(submissionData.teamMembers || []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching submission:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmission();
    }, [courseId, studentId]);

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const updatedSubmission = {
                score: score,
                grade: grade,
                feedback: feedback
            };

            await axios.put(`http://localhost:5000/api/submissions/${courseId}/${studentId}`, updatedSubmission);
            alert("Хадгалагдлаа!");
        } catch (err) {
            setError(err.message);
            alert("Алдаа гарлаа: " + err.message);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">Уншиж байна...</div>;
    if (error) return <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center text-red-500">Алдаа гарлаа: {error}</div>;
    if (!student) return <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">Оюутны мэдээлэл олдсонгүй</div>;

    const submission = submissions[page];

    return (
        <div className="min-h-screen bg-[#F5F7FA] flex">
            {/* Sidebar: Submissions List */}
            <div className="w-64 bg-white rounded-lg shadow p-4 m-6 h-fit self-start">
                <h3 className="font-semibold mb-2">Илгээлтийн жагсаалт</h3>
                <ul className="space-y-2">
                    {submissions.map((s, idx) => (
                        <li key={idx}>
                            <button
                                className={`w-full text-left px-3 py-2 rounded ${page === idx ? "bg-blue-100 font-bold" : "hover:bg-gray-100"}`}
                                onClick={() => {
                                    setPage(idx);
                                    setScore(s.score || 0);
                                    setGrade(s.grade || "");
                                    setFeedback(s.feedback || "");
                                    setSelectedFile(null);
                                }}
                            >
                                {idx + 1}-р илгээлт<br />
                                <span className="text-xs text-gray-500">{s.submittedAt}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Даалгаврын гүйцэтгэл</h1>
                    <button onClick={() => navigate(-1)} className="text-gray-600 text-xl">←</button>
                </div>

                <div className="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <p><strong>Төлөв:</strong> ✔</p>
                        <p><strong>Нэр:</strong> {student.name}</p>
                        <p><strong>Баг:</strong> {student.team}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Оюутны код:</strong> {student.studentId}</p>
                        <p><strong>Үнэлгээ %:</strong> {score}</p>
                        <p><strong>Хязгаар:</strong> 100</p>
                        <p><strong>Илгээсэн хугацаа:</strong> {submission.submittedAt}</p>
                        <p>
                            <strong>Илгээсэн удаа:</strong> <span className={submissions.length > 1 ? "text-orange-600 font-semibold" : "text-gray-700"}>{submissions.length} удаа</span>
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">Багийн гишүүд</h2>
                        <div className="space-y-2 text-sm text-gray-700">
                            {teamMembers.map((member, i) => (
                                <p key={i} className={`${member.studentId === student.studentId ? 'font-bold text-blue-600' : ''}`}>
                                    {member.name} – {member.team} – {member.email} – {member.studentId}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="font-semibold mb-3">Даалгаврын хэсэг</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {submission.files.map((file, i) => (
                            <button key={i} onClick={() => setSelectedFile(file)} className="bg-gray-100 px-4 py-3 rounded flex justify-between items-center hover:bg-blue-100 transition text-left w-full">
                                {file}<span className="text-gray-500">📎</span>
                            </button>
                        ))}
                    </div>

                    {selectedFile && (
                        <div className="mt-6 bg-white border border-gray-300 rounded-lg shadow p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{selectedFile}</h3>
                                <button onClick={() => setSelectedFile(null)} className="text-sm text-gray-500 hover:text-red-500">✕ хаах</button>
                            </div>
                            <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                                Энэ бол <strong>{selectedFile}</strong> файлын урьдчилсан харагдац юм.
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">Авах ёстой оноо:</label>
                            <input type="number" value={100} disabled className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Авсан оноо:</label>
                            <input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Үнэлгээ:</label>
                            <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
                                <option>Хүлээж авсан</option>
                                <option>Тайлбар шаардлагатай</option>
                                <option>Буцаасан</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block mb-1 font-medium">Сэтгэгдэл:</label>
                        <Editor
                            apiKey="no-api-key"
                            value={feedback}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link charmap preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic underline | bullist numlist outdent indent | removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={(newContent) => setFeedback(newContent)}
                        />
                    </div>

                    <div className="flex justify-end items-center mt-6">
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >Хадгалах</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSubmissionPage;