import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const exams = [
    {
        id: 1,
        name: "Biology",
        value: 100,
        questions: 26,
        time: "6:05:32",
        expired: false,
        start: "12:30",
        end: "13:20",
    },
];

const Exam = () => {
    const [activeTab, setActiveTab] = useState("Шалгалт");
    const [showModal, setShowModal] = useState(false);

    const [examForm, setExamForm] = useState({
        name: "",
        hour: "",
        minute: "",
        questions: [
            {
                question: "",
                type: "input",
                correct: "",
                options: [],
                score: 0,
            },
        ],
    });

    const handleQuestionChange = (index, field, value) => {
        const updated = [...examForm.questions];
        updated[index][field] = value;
        setExamForm({ ...examForm, questions: updated });
    };

    const addQuestion = () => {
        setExamForm({
            ...examForm,
            questions: [
                ...examForm.questions,
                { question: "", type: "input", correct: "", options: [], score: 0 },
            ],
        });
    };

    const deleteQuestion = (index) => {
        const filtered = examForm.questions.filter((_, i) => i !== index);
        setExamForm({ ...examForm, questions: filtered });
    };

    const handleSubmit = () => {
        console.log("📝 Exam Created:", examForm);
        setShowModal(false);
        setExamForm({
            name: "",
            hour: "",
            minute: "",
            questions: [
                { question: "", type: "input", correct: "", options: [], score: 0 },
            ],
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    {["Шалгалт", "Шалгалтууд"].map((tab) => (
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

                {activeTab === "Шалгалт" && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 text-sm text-indigo-600 border border-indigo-600 px-4 py-1 rounded hover:bg-indigo-50 transition"
                    >
                        <FaPlus /> Шалгалт нэмэх
                    </button>
                )}
            </div>

            {activeTab === "Шалгалт" && (
                <div className="bg-white p-4 rounded-xl shadow">
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 text-left border-b">
                            <tr>
                                <th>Шалгалтууд</th>
                                <th>Value</th>
                                <th>Асуулт</th>
                                <th>Цаг хугацаа үлдлээ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam, idx) => (
                                <tr key={exam.id} className="border-b last:border-none">
                                    <td className="py-3">#{idx + 1} {exam.name}</td>
                                    <td>{exam.value}</td>
                                    <td>{exam.questions}</td>
                                    <td>{exam.time}</td>
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
            )}

            {activeTab === "Шалгалтууд" && (
                <div className="bg-white p-4 rounded-xl shadow">
                    <table className="w-full text-sm">
                        <thead className="text-gray-500 text-left border-b">
                            <tr>
                                <th>Шалгалтууд</th>
                                <th>Value</th>
                                <th>Асуулт</th>
                                <th>Эхлэх цаг</th>
                                <th>Дуусах цаг</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.map((exam, idx) => (
                                <tr key={exam.id} className="border-b last:border-none">
                                    <td className="py-3">#{idx + 1} {exam.name}</td>
                                    <td>{exam.value}</td>
                                    <td>{exam.questions}</td>
                                    <td>{exam.start}</td>
                                    <td>{exam.end}</td>
                                    <td>
                                        <button className="bg-indigo-600 text-white text-xs px-3 py-1 rounded hover:bg-indigo-700 transition">
                                            Эхлэх
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh] shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Шалгалт үүсгэх</h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                placeholder="Шалгалтын нэр"
                                value={examForm.name}
                                onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                                className="border rounded px-3 py-2 col-span-2"
                            />
                            <input
                                type="number"
                                placeholder="Цаг"
                                value={examForm.hour}
                                onChange={(e) => setExamForm({ ...examForm, hour: e.target.value })}
                                className="border rounded px-3 py-2"
                            />
                            <input
                                type="number"
                                placeholder="Минут"
                                value={examForm.minute}
                                onChange={(e) => setExamForm({ ...examForm, minute: e.target.value })}
                                className="border rounded px-3 py-2"
                            />
                        </div>

                        <h4 className="text-md font-semibold mb-2">Асуултууд</h4>

                        {examForm.questions.map((q, idx) => (
                            <div key={idx} className="border p-4 rounded mb-4 bg-gray-50">
                                <input
                                    type="text"
                                    placeholder="Асуултын текст"
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
                                    className="border rounded px-3 py-2 w-full mb-2"
                                />
                                <div className="flex gap-2 mb-2">
                                    <select
                                        value={q.type}
                                        onChange={(e) =>
                                            handleQuestionChange(idx, "type", e.target.value)
                                        }
                                        className="border rounded px-3 py-2 w-1/2"
                                    >
                                        <option value="input">Input</option>
                                        <option value="select">Select</option>
                                        <option value="checkbox">Checkbox</option>
                                    </select>
                                </div>

                                {(q.type === "select" || q.type === "checkbox") ? (
                                    <div className="flex flex-col gap-2">
                                        {(q.options || []).map((opt, optIdx) => (
                                            <div key={optIdx} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => {
                                                        const updated = [...q.options];
                                                        updated[optIdx] = e.target.value;
                                                        handleQuestionChange(idx, "options", updated);
                                                    }}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                                <input
                                                    type={q.type === "select" ? "radio" : "checkbox"}
                                                    name={`correct-${idx}`}
                                                    checked={q.correct?.includes(optIdx)}
                                                    onChange={() => {
                                                        let updatedCorrect = [...(q.correct || [])];
                                                        if (q.type === "select") {
                                                            updatedCorrect = [optIdx];
                                                        } else {
                                                            if (updatedCorrect.includes(optIdx)) {
                                                                updatedCorrect = updatedCorrect.filter(i => i !== optIdx);
                                                            } else {
                                                                updatedCorrect.push(optIdx);
                                                            }
                                                        }
                                                        handleQuestionChange(idx, "correct", updatedCorrect);
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleQuestionChange(idx, "options", [...(q.options || []), ""])
                                            }
                                            className="text-xs text-indigo-500 hover:underline text-left"
                                        >
                                            + Хариулт нэмэх
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="Зөв хариулт"
                                        value={typeof q.correct === "string" ? q.correct : ""}
                                        onChange={(e) => handleQuestionChange(idx, "correct", e.target.value)}
                                        className="border rounded px-3 py-2 w-full mt-2"
                                    />
                                )}

                                <div className="flex gap-2 items-center mt-3">
                                    <input
                                        type="number"
                                        placeholder="Оноо"
                                        value={q.score}
                                        onChange={(e) => handleQuestionChange(idx, "score", e.target.value)}
                                        className="border rounded px-3 py-2 w-full"
                                    />
                                    <button
                                        onClick={() => deleteQuestion(idx)}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        🗑 Устгах
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addQuestion}
                            className="text-sm text-indigo-600 mb-4 hover:underline"
                        >
                            + Асуулт нэмэх
                        </button>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Болих
                            </button>
                            <button
                                onClick={handleSubmit}
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

export default Exam;
