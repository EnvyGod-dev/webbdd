/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSelect from "../../_components/courseSubmissions/FilterSelect";
import Assignments from "../../_components/viewAssignment/Assignments";

const ViewAssignment = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("Бүгд");

  // Complete list of assignments with Mongolian data
  const allItems = [
    {
      id: 1,
      name: "Алгоритмын бодлого",
      type: "Бие даалт",
      dueDate: "2024-03-25",
    },
    {
      id: 2,
      name: "HTML форм дасгал",
      type: "Лаборатори",
      dueDate: "2024-03-28",
    },
    {
      id: 3,
      name: "CSS Flexbox төсөл",
      type: "Бие даалт",
      dueDate: "2024-03-29",
    },
    {
      id: 4,
      name: "SQL өгөгдлийн сан",
      type: "Лаборатори",
      dueDate: "2024-04-01",
    },
    {
      id: 5,
      name: "JavaScript үйл явц",
      type: "Бие даалт",
      dueDate: "2024-04-02",
    },
    {
      id: 6,
      name: "Python өгөгдөл анализ",
      type: "Бие даалт",
      dueDate: "2024-04-03",
    },
    {
      id: 7,
      name: "Java OOP концепц",
      type: "Лаборатори",
      dueDate: "2024-04-04",
    },
    {
      id: 8,
      name: "C++ Заагч семинар",
      type: "Лаборатори",
      dueDate: "2024-04-05",
    },
    {
      id: 9,
      name: "AI суурь төсөл",
      type: "Нэмэлт даалгавар",
      dueDate: "2024-04-06",
    },
    {
      id: 10,
      name: "Блокчэйн демо",
      type: "Нэмэлт даалгавар",
      dueDate: "2024-04-07",
    },
    {
      id: 11,
      name: "Веб хүртээмж тайлан",
      type: "Бие даалт",
      dueDate: "2024-04-08",
    },
    { id: 12, name: "Мобайл дизайн", type: "Бие даалт", dueDate: "2024-04-09" },
    {
      id: 13,
      name: "Өгөгдөл олборлолт",
      type: "Лаборатори",
      dueDate: "2024-04-10",
    },
    {
      id: 14,
      name: "Кибер аюулгүй байдал",
      type: "Бие даалт",
      dueDate: "2024-04-11",
    },
    {
      id: 15,
      name: "Сүлжээний протокол",
      type: "Лаборатори",
      dueDate: "2024-04-12",
    },
    {
      id: 16,
      name: "UX судалгаа ярилцлага",
      type: "Бие даалт",
      dueDate: "2024-04-13",
    },
    {
      id: 17,
      name: "Firebase баталгаажуулалт",
      type: "Лаборатори",
      dueDate: "2024-04-14",
    },
    {
      id: 18,
      name: "ReactJS компонент",
      type: "Бие даалт",
      dueDate: "2024-04-15",
    },
    {
      id: 19,
      name: "VueJS жижиг апп",
      type: "Нэмэлт даалгавар",
      dueDate: "2024-04-16",
    },
    {
      id: 20,
      name: "Docker суурь даалгавар",
      type: "Нэмэлт даалгавар",
      dueDate: "2024-04-17",
    },
    {
      id: 21,
      name: "Kubernetes семинар",
      type: "Нэмэлт даалгавар",
      dueDate: "2024-04-18",
    },
    {
      id: 22,
      name: "Flutter мобайл UI",
      type: "Бие даалт",
      dueDate: "2024-04-19",
    },
  ];

  const filteredItems =
    filterType === "Бүгд"
      ? allItems
      : allItems.filter((item) => item.type === filterType);

  const homeworkItems = filteredItems.filter(
    (item) => item.type === "Бие даалт"
  );
  const labItems = filteredItems.filter((item) => item.type === "Лаборатори");
  const extraItems = filteredItems.filter(
    (item) => item.type === "Нэмэлт даалгавар"
  );

  const handleViewDetails = () => {
    navigate(`/team2/assignments`);
  };

  return (
    <div className="p-6">
      <div className="flex gap-6">
        {/* Sidebar: FilterSelect */}
        <div className="w-1/4">
          <FilterSelect setFilterType={setFilterType} />
        </div>

        {/* Main content: Assignments */}
        <div className="flex-1">
          <Assignments
            homeworkItems={homeworkItems}
            labItems={labItems}
            extraItems={extraItems}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
