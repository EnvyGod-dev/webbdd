import React from "react";
import { useNavigate } from "react-router-dom";
import GradeDisplay from "../../_components/feedback/GradeDisplay";
import FeedbackText from "../../_components/feedback/FeedbackText";

const getGradeColor = (grade) => {
  if (grade >= 90) return "bg-green-500";
  if (grade >= 80) return "bg-blue-500";
  if (grade >= 70) return "bg-yellow-500";
  return "bg-red-500";
};

const ViewFeedback = () => {
  const navigate = useNavigate();
  // Mock data - In a real application, this would come from an API
  const feedbackData = {
    courseName: "Веб систем ба технологи",
    lessonTopic: "Лаборатор 1: Responsive Portfolio Website",
    grade: 94,
    feedback: "Excellent mobile-first approach, consider adding more interactions.",
    isCounted: false, // эсвэл true
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Үнэлгээ ба санал хүсэлт
          </h1>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-600">Хичээлийн нэр</p>
              <p>{feedbackData.courseName}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-600">Сэдвийн нэр</p>
              <p>{feedbackData.lessonTopic}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Үнэлгээ
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-gray-800">
                  {feedbackData.grade}%
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getGradeColor(
                        feedbackData.grade
                      )}`}
                      style={{ width: `${feedbackData.grade}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Санал хүсэлт
              </h2>
              <FeedbackText feedback={feedbackData.feedback} />
              <div className="mt-4">
                {feedbackData.isCounted ? (
                  <div className="text-green-600 font-semibold">
                    Даалгавар тооцогдсон
                  </div>
                ) : (
                  <div>
                    <div className="text-red-600 font-semibold mb-2">
                      Даалгаврыг тооцоогүй, засан дахин явуул
                    </div>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => navigate('/team2/courses/:courseId/lessons/:lessonId/edit')}
                    >
                      Засах
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;