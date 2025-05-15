import React from "react";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Хэрэглэгчийн мэдээлэл</h2>

      {user.picture && (
        <img
          src={user.picture}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border"
        />
      )}

      <ul className="space-y-2 text-gray-800">
        <li><strong>Нэр:</strong> {user.lastName} {user.firstName}</li>
        <li><strong>Имэйл:</strong> {user.email}</li>
        <li><strong>Регистр:</strong> {user.registerNumber}</li>
        <li><strong>Утас:</strong> {user.phone}</li>
        <li><strong>Хүйс:</strong> {user.gender}</li>
        <li><strong>Сургууль:</strong> {user.school}</li>
        <li><strong>Эрх:</strong> {user.role}</li>
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => navigate("/team4/profile")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Засах
        </button>

        <button
          onClick={() => navigate(`/team4/${user.role}/dashboard`)}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
        >
          Буцах
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;