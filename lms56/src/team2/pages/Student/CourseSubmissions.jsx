import React, { useEffect, useState } from "react";
import SearchBar from "../../_components/Searchbar";
import FilterSelect from "../../_components/courseSubmissions/FilterSelect";
import OverviewSection from "../../_components/courseSubmissions/OverviewSection";
import SubmissionSection from "../../_components/courseSubmissions/SubmissionSection";

const CourseSubmissions = () => {
  useEffect(() => {
    console.log("✅ CourseSubmissions mounted");
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Бүгд");

  const allHomework = [
    { name: "Веб систем ба технологи", percent: 95 },
    { name: "Веб зохиомж", percent: 92 },
    { name: "Төслийн менежмент", percent: 89 },
    { name: "Өгөгдлийн сангийн удирдлага", percent: 67 },
    { name: "Мэдээллийн системийн үндэс", percent: 83 },
    { name: "Мобайл технологи", percent: 59 },
    { name: "Өгөгдлийн тандалт", percent: 45 },
    { name: "Хүний компьютерийн харилцаа", percent: 70 },
    { name: "Програм хангамжийн инженерчлэл", percent: 77 },
    { name: "Туршилтын бодлого", percent: 62 },
  ];

  const allLabs = [
    { name: "Веб систем ба технологи лаб 1", percent: 74 },
    { name: "Веб зохиомж 3", percent: 52 },
    { name: "Мэдээллийн системийн үндэс 4", percent: 36 },
    { name: "Мэдээллийн системийн үндэс лаб 2", percent: 61 },
    { name: "Мэдээллийн системийн үндэс лаб 1", percent: 83 },
    { name: "Мэдээллийн системийн үндэс лаб 3", percent: 28 },
    { name: "Мобайл лаб", percent: 42 },
    { name: "Програмчлалын үндэс лаб", percent: 65 },
    { name: "Сүлжээний лаб", percent: 58 },
    { name: "Датабааз лаб", percent: 75 },
  ];

  const allExtras = [
    { name: "Судалгаа бичих", percent: 80 },
    { name: "Нэмэлт презентаци", percent: 60 },
    { name: "Төслийн нэмэлт тайлан", percent: 90 },
    { name: "Нэмэлт бодлого 1", percent: 55 },
    { name: "Нэмэлт бодлого 2", percent: 65 },
    { name: "Нэмэлт бодлого 3", percent: 45 },
    { name: "Нэмэлт бодлого 4", percent: 75 },
    { name: "Нэмэлт бодлого 5", percent: 85 },
    { name: "Нэмэлт бодлого 6", percent: 40 },
    { name: "Нэмэлт бодлого 7", percent: 95 },
  ];

  const filterBySearch = (items) =>
    items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const homeworkItems = filterBySearch(
    filterType === "Бие даалт" || filterType === "Бүгд" ? allHomework : []
  );

  const labItems = filterBySearch(
    filterType === "Лаборатори" || filterType === "Бүгд" ? allLabs : []
  );

  const extraItems = filterBySearch(
    filterType === "Нэмэлт даалгавар" || filterType === "Бүгд" ? allExtras : []
  );

  const fadeInStyle = {
    animation: "fadeIn 1s ease-in-out",
  };

  const fadeInKeyframes = `
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = fadeInKeyframes;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <aside className="w-full md:w-1/4 p-4 bg-white shadow-md">
        <FilterSelect setFilterType={setFilterType} />
      </aside>

      <main className="w-full md:w-3/4 p-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <OverviewSection />
        <SubmissionSection
          homeworkItems={homeworkItems}
          labItems={labItems}
          extraItems={extraItems}
          fadeInStyle={fadeInStyle}
        />
      </main>
    </div>
  );
};

export default CourseSubmissions;
