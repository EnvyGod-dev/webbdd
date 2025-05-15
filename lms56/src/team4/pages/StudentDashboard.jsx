import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaUser, FaBook, FaKey, FaSignOutAlt, FaClipboardList, FaGraduationCap } from "react-icons/fa";


const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/team4/login");
  };

  const gradeData = [
    { subject: "Программ", grade: 85 },
    { subject: "Өгөгдлийн сан", grade: 92 },
    { subject: "Математик", grade: 76 },
    { subject: "Сүлжээ", grade: 65 },
  ];

  const taskData = [
    { name: "Гүйцэтгэсэн", value: 8 },
    { name: "Үлдсэн", value: 2 },
  ];

  const COLORS = ["#34D399", "#F87171"];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-blue-600 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Оюутан</h2>
          <ul className="space-y-2">
  <li>
    <button onClick={() => navigate("/team4/profile")} className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-700">
      <FaUser /> Миний мэдээлэл
    </button>
  </li>
  <li>
    <button onClick={() => navigate("/team4/grade")} className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-700">
      <FaGraduationCap /> Миний дүн
    </button>
  </li>
  <li>
    <button onClick={() => navigate("/team4/courses")} className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-700">
      <FaBook /> Хичээлүүд
    </button>
  </li>
  <li>
    <button onClick={() => navigate("/team4/profile/change-password")} className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-700">
      <FaKey /> Нууц үг солих
    </button>
  </li>
  <li>
    <button onClick={handleLogout} className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-700">
      <FaSignOutAlt /> Гарах
    </button>
  </li>
</ul>

        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Сайн байна уу, {user?.email || "Оюутан"}!</h2>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Идэвхтэй хичээлүүд</h3>
              <p>5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Ирэх шалгалтууд</h3>
              <p>2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Гүйцэтгэсэн даалгавар</h3>
              <p>8</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Дүнгийн харьцуулалт</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="grade" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Даалгаврын гүйцэтгэл</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Сүүлд хийгдсэн үйлдлүүд</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Та "Программчлалын үндэс" шалгалтаа амжилттай өгсөн.</li>
              <li>"Мэдээллийн сан" хичээлд шинэ даалгавар ирсэн.</li>
              <li>Нууц үг шинэчилсэн.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
