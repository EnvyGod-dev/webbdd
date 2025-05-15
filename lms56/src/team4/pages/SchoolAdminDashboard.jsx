import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  FaUser,
  FaSchool,
  FaPlus,
  FaChartBar,
  FaKey,
  FaSignOutAlt
} from "react-icons/fa";

const SchoolAdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/team4/login");
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = [
    { name: 'Технологийн сургууль', value: 2 },
    { name: 'Бизнесийн сургууль', value: 1 },
    { name: 'Гадаад хэлний сургууль', value: 1 },
  ];

  const barData = [
    { month: '1-р сар', тайлан: 2 },
    { month: '2-р сар', тайлан: 4 },
    { month: '3-р сар', тайлан: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-blue-700 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Сургуулийн Админ</h2>
          <ul className="space-y-2">
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/profile")}>
      <FaUser /> Миний мэдээлэл
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/schools")}>
      <FaSchool /> Сургуулиуд
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/schools/create")}>
      <FaPlus /> Шинэ сургууль бүртгэх
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-800" onClick={() => navigate("/team4/report")}>
      <FaChartBar /> Тайлан, статистик
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
            Сайн байна уу, {user?.email || "Сургуулийн админ"}!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Бүртгэлтэй сургуулиуд</h3>
              <p>4</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Сургуулийн тайлан</h3>
              <p>2 шинэ тайлан</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Идэвхтэй хэрэглэгчид</h3>
              <p>18</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Сургуулийн төрөл</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Сарын тайлангийн тоо</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="тайлан" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Сүүлд хийгдсэн үйлдлүүд</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Шинэ сургууль "Технологийн сургууль" нэмсэн.</li>
              <li>Сургуулийн мэдээлэл шинэчилсэн.</li>
              <li>Нууц үг шинэчилсэн.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;
