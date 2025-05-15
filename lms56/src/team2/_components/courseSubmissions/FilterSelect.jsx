import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterSelect = ({ setFilterType }) => {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState("all");
  const [selectedType, setSelectedType] = useState("Бүгд");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const lessons = [
    { label: "Бүгд", value: "all" },
    { label: "Мэдээллийн системийн үндэс", value: "Мэдээллийн системийн үндэс" },
    { label: "Веб систем ба технологи", value: "Веб систем ба технологи" },
    { label: "Мобайл технологи", value: "Мобайл технологи" },
    { label: "Өгөгдлийн тандалт", value: "Өгөгдлийн тандалт" },
    { label: "Веб зохиомж", value: "Веб зохиомж" },
  ];

  const types = [
    { label: "Бүгд", value: "Бүгд" },
    { label: "Бие даалт", value: "Бие даалт" },
    { label: "Лаборатори", value: "Лаборатори" },
    { label: "Нэмэлт", value: "Нэмэлт" },
  ];

  const handleLessonChange = (value) => {
    setSelectedLesson(value);
    if (value !== "all") {
      navigate("lesson/submissions");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-h-screen overflow-hidden bg-white-100">
      <div className="mb-4">
        <h3 className="text-l font-bold mb-4">📘 Хичээл сонгох</h3>
        <div className="flex flex-col gap-3">
          {lessons.map((lesson) => (
            <label
              key={lesson.value}
              className={`cursor-pointer px-3 py-2 rounded-lg border transition-all ${
                selectedLesson === lesson.value
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name="lesson"
                value={lesson.value}
                checked={selectedLesson === lesson.value}
                onChange={() => handleLessonChange(lesson.value)}
                className="mr-2"
              />
              {lesson.label}
            </label>
          ))}
        </div>
      </div>

<div className="flex gap-6 mb-4">
  {/* Date Range */}
  <div className="flex-1">
    <h3 className="text-l font-bold mb-4">📅 Хугацаа сонгох</h3>
    <div className="flex flex-col gap-4">
      <div>
        <label className="block mb-1 font-semibold">Эхлэх огноо</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Дуусах огноо</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  </div>

  <div className="flex-1">
    <h3 className="text-l font-bold mb-4">📂Төрөл</h3>
    <div className="flex flex-wrap gap-2">
      {types.map((type) => (
        <label
          key={type.value}
          className={`cursor-pointer px-4 py-2 rounded-full border transition-all ${
            selectedType === type.value
              ? "bg-green-100 border-green-500"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <input
            type="radio"
            name="type"
            value={type.value}
            checked={selectedType === type.value}
            onChange={() => {
              setSelectedType(type.value);
              setFilterType(type.value);
            }}
            className="mr-2"
          />
          {type.label}
        </label>
      ))}
    </div>
  </div>
</div>

    </div>
  );
};

export default FilterSelect;

