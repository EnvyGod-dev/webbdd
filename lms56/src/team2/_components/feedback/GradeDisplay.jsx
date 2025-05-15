import React from 'react';

const GradeDisplay = ({ grade, maxGrade = 100 }) => {
    return (
        <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Үнэлгээ</h2>
            <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-blue-600">{grade}</div>
                <div className="text-gray-600">/ {maxGrade}</div>
            </div>
        </div>
    );
};

export default GradeDisplay;