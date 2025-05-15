import React from "react";
import { FaChartLine } from "react-icons/fa";

const data = {
  exam: {
    title: "шалгалт",
    count: 203,
    color: "from-blue-400 to-blue-600",
  },
  students: {
    title: "оюутан",
    count: 351,
    color: "from-pink-400 to-pink-600",
  },
};

const BarChart = ({ color }) => {
  const heights = [40, 60, 50, 65, 80, 90, 100];
  return (
    <div className="flex items-end gap-2 h-28">
      {heights.map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className={`w-3 rounded-sm bg-gradient-to-t ${color} opacity-80`}
        ></div>
      ))}
    </div>
  );
};

const StatCard = ({ title, count, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xs">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
        <FaChartLine className="text-gray-300" />
      </div>
      <BarChart color={color} />
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Хянах самбар</h1>
      <div className="flex gap-6 flex-wrap">
        <StatCard
          title={data.exam.title}
          count={data.exam.count}
          color={data.exam.color}
        />
        <StatCard
          title={data.students.title}
          count={data.students.count}
          color={data.students.color}
        />
      </div>
    </div>
  );
};

export default Dashboard;
