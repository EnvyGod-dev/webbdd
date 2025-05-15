import React, { useEffect, useState } from "react";

const getColor = (percent) => {
  if (percent >= 85) return "bg-green-500";
  if (percent >= 75) return "bg-blue-500";
  if (percent >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const SubmissionProgress = ({ title, items }) => {
  const [animatedItems, setAnimatedItems] = useState(
    items.map((item) => ({
      ...item,
      currentPercent: 0,
    }))
  );
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? animatedItems : animatedItems.slice(0, 6);

  useEffect(() => {
    items.forEach((item, index) => {
      const targetPercent = item.percent;
      let currentPercent = 0;
      const interval = setInterval(() => {
        if (currentPercent < targetPercent) {
          currentPercent += 3;
          setAnimatedItems((prevItems) => {
            const updated = [...prevItems];
            updated[index].currentPercent = Math.min(currentPercent, targetPercent);
            return updated;
          });
        } else {
          clearInterval(interval);
        }
      }, 10);
    });
  }, [items]);

  return (
    <div className="bg-white p-4 rounded-3xl shadow">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      {visibleItems.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between mb-1">
            <span>{item.name}</span>
            <span>{item.currentPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className={`h-2 rounded transition-all duration-500 ease-in-out ${getColor(
                item.currentPercent
              )}`}
              style={{
                width: `${item.currentPercent}%`,
                transitionProperty: "width, background-color",
              }}
            />
          </div>
        </div>
      ))}
      {items.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-blue-600 hover:underline text-sm"
        >
          {showAll ? "See Less ▲" : "See More ▼"}
        </button>
      )}
    </div>
  );
};

export default SubmissionProgress;
