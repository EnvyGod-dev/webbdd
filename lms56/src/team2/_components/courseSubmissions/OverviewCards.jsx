import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const dummyData = [
  { uv: 10 },
  { uv: 15 },
  { uv: 25 },
  { uv: 40 },
  { uv: 38 },
  { uv: 45 },
  { uv: 60 },
  { uv: 55 },
  { uv: 62 },
  { uv: 70 }
];

const OverviewCard = ({ title, value }) => {
  return (
    <div className="border rounded-3xl p-4 shadow-sm bg-white w-full max-w-full">
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyData}>
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewCard;
