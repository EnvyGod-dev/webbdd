import React from 'react';
import FeedbackText from '../_components/feedback/FeedbackText';

const getGradeColor = (grade) => {
    if (grade >= 90) return 'bg-green-500';
    if (grade >= 80) return 'bg-blue-500';
    if (grade >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
};

const ViewFeedback = () => {
    // Mock data - In a real application, this would come from an API
    const feedbackData = {
        courseName: "Веб систем ба технологи",
        lessonTopic: "Лаборатор 1: React компонент ба төлөв удирдлага",
        grade: 95,
        feedback: "Сайн ажилласан. Код нь маш сайн зохион байгуулагдсан, тайлбар нь тодорхой. Дараагийн удаа илүү их тест бичих хэрэгтэй."
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Үнэлгээ ба санал хүсэлт</h1>
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
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Үнэлгээ</h2>
                            <div className="flex items-center gap-4">
                                <div className="text-4xl font-bold text-gray-800">{feedbackData.grade}%</div>
                                <div className="flex-1">
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full transition-all duration-500 ${getGradeColor(feedbackData.grade)}`}
                                            style={{ width: `${feedbackData.grade}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Санал хүсэлт</h2>
                            <FeedbackText feedback={feedbackData.feedback} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewFeedback; 