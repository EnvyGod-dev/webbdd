import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const [bachelorCourses, setBachelorCourses] = useState([]);
  const [masterCourses, setMasterCourses] = useState([]);

  useEffect(() => {
    console.log("Fetching courses...");
    axios.get("http://localhost:5000/api/courses")
      .then((res) => {
        console.log("Received courses:", res.data);
        const allCourses = res.data;
        setBachelorCourses(allCourses.filter(course => course.level === "bachelor"));
        setMasterCourses(allCourses.filter(course => course.level === "master"));
      })
      .catch((err) => {
        console.error("❌ Error fetching courses:", err);
      });
  }, []);

  const CourseCard = ({ course }) => (
    <Link to={`/team2/courses/${course.id}`}>
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div>
          <div className="font-medium text-gray-800">{course.name}</div>
          <div className="text-sm text-gray-500">
            {course.seats} оюутан &middot; {course.time}
          </div>
        </div>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {course.status}
        </span>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex items-center mb-8">
        <img src="/mustlogo.png" alt="MUST EDU" className="h-10 mr-3" />
        <h1 className="text-2xl font-bold">Хичээл</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Бакалаврын хичээл</h2>
          <div className="space-y-4">
            {bachelorCourses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Магистрын хичээл</h2>
          <div className="space-y-4">
            {masterCourses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoursesList;