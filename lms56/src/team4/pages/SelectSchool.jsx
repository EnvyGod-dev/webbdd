import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectSchool = () => {
  const [school, setSchool] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (school) {
      localStorage.setItem("selectedSchool", school); // Store school
      navigate("/team4/login"); // Go to login
    } else {
      alert("Сургууль сонгоно уу.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Сургууль сонгох</h2>
        <select
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-6"
        >
          <option value="">-- Сургууль сонгох --</option>
          <option value="ШУТИС">ШУТИС</option>
          <option value="МУИС">МУИС</option>
          <option value="ХААИС">ХААИС</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Үргэлжлүүлэх
        </button>
      </form>
    </div>
  );
};

export default SelectSchool;
