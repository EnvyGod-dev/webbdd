import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { FaUser, FaUsersCog, FaLock, FaSignOutAlt, FaListUl, FaChartPie } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/team4/login");
  };

  const roleDistribution = [
    { name: "Оюутан", value: 90 },
    { name: "Багш", value: 20 },
    { name: "Сургуулийн админ", value: 5 },
    { name: "Системийн админ", value: 5 },
  ];

  const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-blue-800 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Админ</h2>
          <ul className="space-y-2">
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-900" onClick={() => navigate("/team4/profile")}>
      <FaUser /> Миний мэдээлэл
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-900" onClick={() => navigate("/team4/roles")}>
      <FaListUl /> Хэрэглэгчийн төрөл
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-900" onClick={() => navigate("/team4/users")}>
      <FaUsersCog /> Хэрэглэгч удирдах
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-900" onClick={() => navigate("/team4/profile/change-password")}>
      <FaLock /> Нууц үг солих
    </button>
  </li>
  <li>
    <button className="w-full flex items-center gap-2 text-left py-2 px-4 hover:bg-blue-900" onClick={handleLogout}>
      <FaSignOutAlt /> Гарах
    </button>
  </li>
</ul>

        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            Сайн байна уу, {user?.email || "Админ"}!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Нийт хэрэглэгчид</h3>
              <p>120</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Админ эрхтэй хэрэглэгчид</h3>
              <p>5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Шинэ бүртгүүлсэн</h3>
              <p>8</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
  <FaChartPie /> Хэрэглэгчийн төрөл бүртгэл
</h3>

            <PieChart width={400} height={250}>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Сүүлд хийгдсэн үйлдлүүд</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Шинэ хэрэглэгч "Админ А" бүртгэгдсэн.</li>
              <li>2 хэрэглэгчийн мэдээлэл шинэчлэгдсэн.</li>
              <li>Админ өөрийн нууц үг сольсон.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
