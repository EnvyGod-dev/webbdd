import React from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { FaUser, FaUsers, FaEdit, FaLayerGroup, FaUserFriends, FaKey, FaSignOutAlt } from "react-icons/fa";


const TeacherDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/team4/login");
  };

  const attendanceData = [
    { name: "WEB SYSTEM ", attendance: 92 },
    { name: "WEB SYSTEM LECTURE", attendance: 85 },
    { name: "WEB SYSTEM LABAROTARY", attendance: 78 },
    { name: "WEB ZOHIOMJ", attendance: 88 },
    { name: "WEB ZOHIOMJ", attendance: 95 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-blue-700 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Багш</h2>
          <ul className="space-y-2">
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/profile")}>
      <FaUser /> Миний мэдээлэл
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/courses/123/users")}>
      <FaUsers /> Хичээлийн хэрэглэгчид
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/courses/123/users/edit")}>
      <FaEdit /> Хэрэглэгч удирдах
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/courses/123/groups")}>
      <FaLayerGroup /> Бүлэг удирдах
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/courses/123/groups/456/users")}>
      <FaUserFriends /> Бүлгийн хэрэглэгчид
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/profile/change-password")}>
      <FaKey /> Нууц үг солих
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={handleLogout}>
      <FaSignOutAlt /> Гарах
    </button>
  </li>
</ul>

        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Сайн байна уу, {user?.email || "Багш"}!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Зааж буй хичээлүүд</h3>
              <p>3</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Ирэх шалгалтууд</h3>
              <p>2</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Оюутны илгээсэн даалгавар</h3>
              <p>15</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Сүүлд хийгдсэн үйлдлүүд</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>"Вэб хөгжүүлэлт" хичээл дээр шинэ шалгалт үүсгэсэн.</li>
              <li>3 оюутны даалгавар шалгасан.</li>
              <li>Нууц үг шинэчилсэн.</li>
            </ul>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Оюутны ирцийн статистик</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="attendance" fill="#38bdf8" name="Ирц" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
