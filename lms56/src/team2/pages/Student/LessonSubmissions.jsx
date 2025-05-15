/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OverviewCard from "../../_components/courseSubmissions/OverviewCards";
import { FiCheckCircle, FiClock, FiFileText, FiMonitor } from "react-icons/fi";

const LessonSubmissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Бүгд");
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(
    "Web Systems and Technology"
  );

  const courses = {
    "Web Systems and Technology": {
      title: "Web Systems and Technology",
      assignments: [
        {
          taskName: "Responsive Portfolio Website",
          status: "Илгээсэн",
          grade: "94/100",
          submissionDate: "2023-11-15",
          feedback:
            "Excellent mobile-first approach, consider adding more interactions",
        },
        {
          taskName: "REST API Implementation",
          status: "Илгээсэн",
          grade: "88/100",
          submissionDate: "2023-11-18",
          feedback: "Good CRUD operations, needs better error handling",
        },
        {
          taskName: "React E-commerce Dashboard",
          status: "Илгээсэн",
          grade: "91/100",
          submissionDate: "2023-11-22",
          feedback:
            "Impressive state management, improve responsive breakpoints",
        },
        {
          taskName: "Web Security Best Practices",
          status: "Хүлээгдэж буй",
          grade: "-",
          submissionDate: "-",
          feedback: "-",
        },
        {
          taskName: "Web Performance Optimization",
          status: "Илгээсэн",
          grade: "89/100",
          submissionDate: "2023-11-25",
          feedback: "Good Lighthouse score improvements",
        },
        {
          taskName: "CMS Implementation",
          status: "Илгээсэн",
          grade: "85/100",
          submissionDate: "2023-11-28",
          feedback:
            "Solid WordPress customization, consider accessibility features",
        },
        {
          taskName: "Progressive Web App Development",
          status: "Хүлээгдэж буй",
          grade: "-",
          submissionDate: "-",
          feedback: "-",
        },
        {
          taskName: "WebSocket Chat Application",
          status: "Илгээсэн",
          grade: "92/100",
          submissionDate: "2023-12-01",
          feedback: "Excellent real-time implementation",
        },
        {
          taskName: "GraphQL API Integration",
          status: "Илгээсэн",
          grade: "90/100",
          submissionDate: "2023-12-03",
          feedback: "Good TypeScript implementation",
        },
        {
          taskName: "Serverless Architecture Project",
          status: "Хүлээгдэж буй",
          grade: "-",
          submissionDate: "-",
          feedback: "-",
        },
      ],
    },
    "Төслийн менежмент": {
      title: "Төслийн менежмент",
      assignments: [
        {
          taskName: "Хөтөлбөрийн хүрээний тодорхойлолт",
          status: "Илгээсэн",
          grade: "85/100",
          submissionDate: "2023-11-10",
          feedback: "Сайн боловсруулсан, цаг хугацааны график нэмэх",
        },
        {
          taskName: "Эрсдэлийн үнэлгээний тайлан",
          status: "Илгээсэн",
          grade: "88/100",
          submissionDate: "2023-11-14",
          feedback: "Бүрэн гүйцэд дүн шинжилгээ хийсэн",
        },
      ],
    },
    "Өгөгдлийн сангийн удирдлага": {
      title: "Өгөгдлийн сангийн удирдлага",
      assignments: [
        {
          taskName: "SQL Query Optimization",
          status: "Илгээсэн",
          grade: "88/100",
          submissionDate: "2023-11-12",
          feedback: "Сайн хийгдсэн, индексчлэлд анхаарна уу",
        },
      ],
    },
    "Мэдээллийн системийн үндэс": {
      title: "Мэдээллийн системийн үндэс",
      assignments: [
        {
          taskName: "Системийн шаардлагын шинжилгээ",
          status: "Хүлээгдэж буй",
          grade: "-",
          submissionDate: "-",
          feedback: "-",
        },
      ],
    },
  };

  const currentCourse = courses[selectedCourse];

  const filteredSubmissions = currentCourse.assignments.filter((assignment) => {
    const matchesSearch = assignment.taskName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedFilter === "Бүгд" || assignment.status === selectedFilter;
    return matchesSearch && matchesStatus;
  });

  const submittedCount = currentCourse.assignments.filter(
    (s) => s.status === "Илгээсэн"
  ).length;
  const totalTasks = currentCourse.assignments.length;
  const averageGrade =
    currentCourse.assignments
      .filter((s) => s.status === "Илгээсэн")
      .reduce((acc, curr) => acc + parseInt(curr.grade), 0) / submittedCount ||
    0;

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <div className="sticky top-0 bg-gray-50 z-10 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="text-l font-bold text-gray-800 bg-white border rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
          >
            {Object.keys(courses).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Даалгавараар хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-300 w-full md:w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="mb-4">
  <h3 className="text-lg font-bold mb-4">📂 Статус сонгох</h3>
  <div className="flex gap-4">
    <label className="cursor-pointer px-4 py-2 rounded-full border transition-all">
      <input
        type="radio"
        name="status"
        value="Бүгд"
        checked={selectedFilter === "Бүгд"}
        onChange={(e) => setSelectedFilter(e.target.value)}
        className="mr-2"
      />
      Статус: Бүгд
    </label>
    <label className="cursor-pointer px-4 py-2 rounded-full border transition-all">
      <input
        type="radio"
        name="status"
        value="Илгээсэн"
        checked={selectedFilter === "Илгээсэн"}
        onChange={(e) => setSelectedFilter(e.target.value)}
        className="mr-2"
      />
      Илгээсэн
    </label>
    <label className="cursor-pointer px-4 py-2 rounded-full border transition-all">
      <input
        type="radio"
        name="status"
        value="Хүлээгдэж буй"
        checked={selectedFilter === "Хүлээгдэж буй"}
        onChange={(e) => setSelectedFilter(e.target.value)}
        className="mr-2"
      />
      Хүлээгдэж буй
    </label>
  </div>
</div>

        
        </div>
      </div> 

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <FiMonitor className="w-6 h-6 text-gray-400 mt-1 mr-3" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {submission.taskName}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        submission.status === "Илгээсэн"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {submission.submissionDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Үнэлгээ:</span>
                  <span
                    className={`font-semibold ${
                      submission.grade !== "-"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {submission.grade}
                  </span>
                </div>

                {submission.feedback && submission.feedback !== "-" && (
                <div
                  className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                  onClick={() => navigate("/team2/submissions/lesson/submissions/feedback")}
                >
                    <p className="font-medium text-gray-700 mb-1">
                      Санал шүүмж:
                    </p>
                <p className="text-gray-600 leading-relaxed">
                {submission.feedback}
                  </p>
                </div>
)}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto text-gray-500">
              <FiClock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg">Илгээсэн даалгавар олдсонгүй</p>
              <p className="mt-2 text-sm">
                Шүүлтүүр тохиргоогоо шалгана уу эсвэл өөр хайлтын нөхцөл
                оролдоно уу
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonSubmissions;
