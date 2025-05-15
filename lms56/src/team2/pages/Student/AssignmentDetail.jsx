/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const AssignmentDetails = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const assignment = {
    id: 1,
    name: "Алгоритмын бодлого",
    type: "Бие даалт",
    dueDate: "2024-03-25",
    description: "Алгоритмын үндсэн бодлого бодох...",
    instructions: "Дараах шаардлагыг хангасан бодолтыг илгээнэ үү..."
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{assignment.name}</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Тодорхойлолт:</h2>
          <p>{assignment.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Заавар:</h2>
          <p>{assignment.instructions}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">
          Дуусах хугацаа: 
          </p>
        </div>
        <button
          onClick={() => navigate(`/team2/courses/${courseId}/lessons/${lessonId}/submit`)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Даалгавар илгээх
        </button>
      </div>
    </div>
  );
};
export default AssignmentDetails;
