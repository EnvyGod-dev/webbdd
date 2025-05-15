import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const examNames = ["Math", "Biology", "Physics"];

const takingStudents = [
    { id: 1, name: "Бат-Эрдэнэ", code: "B231890063", email: "bat_erdene@mail.com", exam: "Math" },
    { id: 2, name: "Тэмүүлэн", code: "B231890063", email: "temuulen123@gmail.com", exam: "Biology" },
];

const submittedStudents = [
    { id: 1, name: "Сэргэлэн", code: "B231890054", email: "sergelen@example.com", exam: "Math", score: 85 },
    { id: 2, name: "Баяраа", code: "B231890055", email: "bayaraa@example.com", exam: "Biology", score: 90 },
];

const Register = () => {
    const [activeTab, setActiveTab] = useState("Шалгалт өгөх оюутан");
    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState({
        name: "",
        code: "",
        email: "",
        exam: "",
        score: ""
    });

    const students = activeTab === "Шалгалт өгөх оюутан" ? takingStudents : submittedStudents;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    {["Шалгалт өгөх оюутан", "Өгсөн оюутан"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-semibold border-b-2 pb-1 ${activeTab === tab
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-indigo-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "Шалгалт өгөх оюутан" && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 text-sm text-indigo-600 border border-indigo-600 px-4 py-1 rounded hover:bg-indigo-50 transition"
                    >
                        <FaPlus /> Оюутан нэмэх
                    </button>
                )}
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Exam</h2>
                <table className="w-full text-sm">
                    <thead className="text-gray-500 text-left border-b">
                        <tr>
                            <th className="py-2">Нэр</th>
                            <th>code</th>
                            <th>e-mail</th>
                            <th>Шалгалт</th>
                            {activeTab === "Өгсөн оюутан" && <th>Оноо</th>}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, idx) => (
                            <tr key={student.id} className="border-b last:border-none">
                                <td className="py-3">#{idx + 1} {student.name}</td>
                                <td>{student.code}</td>
                                <td>{student.email}</td>
                                <td>{student.exam}</td>
                                {activeTab === "Өгсөн оюутан" && <td>{student.score}</td>}
                                <td>
                                    <div className="flex gap-3 text-indigo-600 text-sm">
                                        <FaEdit className="cursor-pointer hover:text-indigo-800" />
                                        <FaTrash className="cursor-pointer hover:text-red-600" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Оюутан нэмэх</h2>

                        <div className="flex flex-col gap-3 mb-4">
                            <input
                                type="text"
                                placeholder="Нэр"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="border rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Код"
                                value={form.code}
                                onChange={(e) => setForm({ ...form, code: e.target.value })}
                                className="border rounded px-3 py-2"
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="border rounded px-3 py-2"
                            />
                            <select
                                value={form.exam}
                                onChange={(e) => setForm({ ...form, exam: e.target.value })}
                                className="border rounded px-3 py-2"
                            >
                                <option value="">Шалгалт сонгох</option>
                                {examNames.map((exam) => (
                                    <option key={exam} value={exam}>{exam}</option>
                                ))}
                            </select>
                            {activeTab === "Өгсөн оюутан" && (
                                <input
                                    type="number"
                                    placeholder="Оноо"
                                    value={form.score}
                                    onChange={(e) => setForm({ ...form, score: e.target.value })}
                                    className="border rounded px-3 py-2"
                                />
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Болих
                            </button>
                            <button
                                onClick={() => {
                                    console.log("✅ Added student:", form);
                                    setShowModal(false);
                                    setForm({ name: "", code: "", email: "", exam: "", score: "" });
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Хадгалах
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
