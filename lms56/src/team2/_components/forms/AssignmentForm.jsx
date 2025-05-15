import React, { useState } from 'react';
import { Editor } from "@tinymce/tinymce-react";

const AssignmentForm = () => {
    const [formData, setFormData] = useState({
        assignmentType: '',
        title: '',
        description: '',
        deadline: '',
        totalPoints: '',
        attachments: [],
        isGroupTask: false,
        groups: []
    });

    const [message, setMessage] = useState('');

    //form ilgeeh
    const handleSubmit = (e) => {
        e.preventDefault();

        const { assignmentType, title, description, deadline, totalPoints } = formData;

        if (!assignmentType || !title || !description || !deadline || !totalPoints) {
            alert("Бүх шаардлагатай талбарыг бөглөнө үү!");
            return;
        }

        console.log(formData); // API руу илгээх логик энд бичнэ
        setMessage("Амжилттай илгээгдлээ!");
    };
    //file havsargah
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
    };

    const removeFile = (index) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const getAttachmentLabel = () => {
        switch (formData.assignmentType) {
            case 'laboratory':
                return 'Лабораторийн ажлын удирдамж';
            case 'seminar':
                return 'Бие даалтын ажлын удирдамж';
            case 'homework':
                return 'Нэмэлт даалгаврын удирдамж';
            default:
                return 'Удирдамж';
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="space-y-6">
                {/* Даалгаврын төрөл */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Даалгаврын төрөл
                    </label>
                    <select
                        value={formData.assignmentType}
                        onChange={(e) => setFormData({ ...formData, assignmentType: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Сонгох</option>
                        <option value="laboratory">Лабораторийн ажил</option>
                        <option value="seminar">Бие даалтын ажил</option>
                        <option value="homework">Нэмэлт даалгаврын ажил</option>
                    </select>
                </div>

                {/* Гарчиг */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Гарчиг
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Даалгаврын гарчиг оруулах"
                    />
                </div>

                {/* Тайлбар */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Тайлбар
                    </label>
                    <Editor
  value={formData.description}
  init={{
    height: 200,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount"
    ],
    toolbar:
      "undo redo | formatselect | bold italic backcolor | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | removeformat | help"
  }}
  onEditorChange={(content) => setFormData({ ...formData, description: content })}
/>
                </div>

                {/* Эцсийн хугацаа */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Эцсийн хугацаа
                    </label>
                    <input
                        type="datetime-local"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Нийт оноо */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Нийт авах ёстой оноо
                    </label>
                    <input
                        type="number"
                        value={formData.totalPoints}
                        onChange={(e) => setFormData({ ...formData, totalPoints: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Нийт оноо оруулах"
                        min="0"
                    />
                </div>

                {/* Удирдамж */}
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        {getAttachmentLabel()}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                            multiple
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center"
                        >
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span className="text-gray-600">Хавсралт оруулах</span>
                            <span className="text-sm text-gray-500 mt-1">Олон файл сонгох боломжтой</span>
                        </label>
                    </div>
                    
                    {/* Сонгосон файлуудын жагсаалт */}
                    {formData.attachments.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {formData.attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-gray-700">{file.name}</span>
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({(file.size / 1024).toFixed(1)} KB)
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Багаар гүйцэтгэх */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.isGroupTask}
                        onChange={(e) => setFormData({ ...formData, isGroupTask: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-gray-700">
                        Багаар гүйцэтгэх
                    </label>
                </div>

                {/* Багийн гишүүдийн нэрс (group enabled үед) */}
                {formData.isGroupTask && (
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Багийн гишүүдийн нэрс
                        </label>
                        <textarea
                            value={formData.groups.join('\n')}
                            onChange={(e) =>
                                setFormData({ ...formData, groups: e.target.value.split('\n') })
                            }
                            placeholder="Нэг мөрөнд нэг гишүүн"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        />
                    </div>
                )}

                {/* Илгээх товчлуур */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    ИЛГЭЭХ
                </button>

                {/* Амжилттай илгээгдсэн мэдэгдэл */}
                {message && (
                    <div className="text-green-600 mt-4 font-medium">
                        {message}
                    </div>
                )}
            </div>
        </form>
    );
};

export default AssignmentForm;
