/* eslint-disable no-undef */
import React, { useState } from "react";

const AssignmentList = ({ title, items, onViewDetails }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 6);

  return (
    <div className="bg-white p-4 rounded-3xl shadow">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      <div className="space-y-3">
        {visibleItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
              Дуусах хугацаа: {`${new Date(item.dueDate).getFullYear()}-${String(new Date(item.dueDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(item.dueDate).getDate()).padStart(2, '0')}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                Илгээсэн
              </span>
              <button
                onClick={() => onViewDetails(item.id)}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-sm"
              >
                Даалгавар харах
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-blue-600 hover:underline text-sm"
        >
          {showAll ? "Бага харах ▲" : "Бүгдийг харах ▼"}
        </button>
      )}
    </div>
  );
};
export default AssignmentList;