import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBook, FaTasks, FaSignOutAlt } from "react-icons/fa";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/team4/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-blue-700 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Хэрэглэгч</h2>
          <ul className="space-y-2">
            <li>
              <button
                className="w-full text-left py-2 px-4 hover:bg-blue-800 flex items-center gap-2"
                onClick={() => navigate("/team4/profile")}
              >
                <FaUser /> Миний мэдээлэл
              </button>
            </li>
            <li>
              <button
                className="w-full text-left py-2 px-4 hover:bg-blue-800 flex items-center gap-2"
                onClick={() => navigate("/team4/courses")}
              >
                <FaBook /> Хичээлүүд
              </button>
            </li>
            <li>
              <button
                className="w-full text-left py-2 px-4 hover:bg-blue-800 flex items-center gap-2"
                onClick={() => navigate("/team4/profile/change-password")}
              >
                🔒 Нууц үг солих
              </button>
            </li>
            <li>
              <button
                className="w-full text-left py-2 px-4 hover:bg-blue-800 flex items-center gap-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Гарах
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Сайн байна уу, {user?.email || "Хэрэглэгч"}!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Хичээлүүд</h3>
              <p>6</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Ирэх шалгалтууд</h3>
              <p>3</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Гүйцэтгэсэн даалгавар</h3>
              <p>12</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Сүүлд хийгдсэн үйлдлүүд</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>"Программчлал" хичээлд шинэ даалгавар ирсэн.</li>
              <li>Та шалгалтаа амжилттай өгсөн.</li>
              <li>Нууц үгээ шинэчилсэн.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
