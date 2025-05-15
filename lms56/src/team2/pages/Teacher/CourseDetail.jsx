import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    // Static course data as fallback
    const staticCourses = [
        { id: 101, name: "Веб систем ба технологи 101", seats: 120, time: "10:00 AM", status: "Идэвхтэй", level: "bachelor" },
        { id: 220, name: "Програм хангамжийн инженерчлэл 220", seats: 80, time: "11:00 AM", status: "Идэвхтэй", level: "bachelor" },
        { id: 201, name: "Өгөгдлийн сан 201", seats: 60, time: "01:00 PM", status: "Идэвхтэй", level: "bachelor" },
        { id: 301, name: "Үүлэн технологи 301", seats: 40, time: "02:00 PM", status: "Идэвхтэй", level: "bachelor" },
        { id: 101, name: "Дата анализ 101", seats: 20, time: "03:00 PM", status: "Идэвхтэй", level: "master" },
        { id: 220, name: "Үйлдлийн систем 220", seats: 15, time: "04:00 PM", status: "Идэвхтэй", level: "master" },
        { id: 201, name: "Төслийн менежмент 201", seats: 10, time: "05:00 PM", status: "Идэвхтэй", level: "master" },
    ];

    // Static data for lessons and attendance
    const additionalData = {
        lessons: [
            { id: 1, name: "Лекц 1" },
            { id: 2, name: "Лабораторийн ажил 1" },
            { id: 3, name: "Нэмэлт дадлага 1" },
        ],
        attendance: [
            { group: "5 - 4", type: "Лабораторийн цаг", present: 24, absent: 6 },
            { group: "5 - 5", type: "Лабораторийн цаг", present: 20, absent: 4 },
            { group: "5 - 6", type: "Лабораторийн цаг", present: 31, absent: 8 },
        ],
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                console.log("Fetching course ID:", courseId);
                const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
                console.log("API Response:", response.data);

                // Always ensure lessons and attendance exist
                const courseData = {
                    ...response.data,
                    lessons: response.data.lessons || additionalData.lessons,
                    attendance: response.data.attendance || additionalData.attendance
                };
                
                console.log("Final course data:", courseData);
                setCourse(courseData);
            } catch (err) {
                console.log("Error, falling back to static data");
                // Fallback to static data if API fails
                const staticCourse = staticCourses.find(c => c.id === parseInt(courseId));
                if (staticCourse) {
                    setCourse({
                        ...staticCourse,
                        lessons: additionalData.lessons,
                        attendance: additionalData.attendance,
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-500">Course not found</div>
            </div>
        );
    }

    // Add null checks before mapping
    const lessons = course.lessons || [];
    const attendance = course.attendance || [];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Хичээлийн дэлгэрэнгүй</h2>
                    <p className="text-sm text-gray-500">{course.name}</p>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-gray-600 hover:text-blue-600"
                >
                    ← Буцах
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                    <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded">
                        Засварлах
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    Суудал: {course.seats} • Цаг: {course.time} • Төлөв: {course.status}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <h4 className="text-md font-semibold mb-3 text-gray-800">Сэдвүүд</h4>
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="flex justify-between items-center mb-2 p-3 border rounded hover:bg-gray-50"
                        >
                            <div>
                                <div className="font-medium text-gray-700">{lesson.name}</div>
                                <div className="text-sm text-gray-500">
                                    Хугацаа: {course.time}
                                </div>
                            </div>
                            <button className="text-gray-500 hover:text-blue-600 text-lg">✎</button>
                        </div>
                    ))}
                    <button
                        onClick={() => navigate("/team2/assignments/create")}
                        className="mt-3 text-sm text-blue-500 hover:underline"
                    >
                        + Нэмэх
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h4 className="text-md font-semibold mb-3 text-gray-800">Даалгавар үзэх</h4>
                    {attendance.map((a, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center mb-2 p-3 border rounded hover:bg-gray-50"
                            onClick={() => navigate(`/team2/courses/${courseId}/submissions`)}
                        >
                            <div>
                                <div className="font-medium text-gray-700">
                                    {a.group} - {a.type}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Оюутан: {a.present} &nbsp; &middot; &nbsp; Баг: {a.absent}
                                </div>
                            </div>
                            <button className="text-gray-500 hover:text-blue-600 text-lg">👁</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;