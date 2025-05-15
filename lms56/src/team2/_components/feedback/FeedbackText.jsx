import React from 'react';

/* const FeedbackText = ({ feedback }) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Санал хүсэлт</h2>
            <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{feedback}</p>
            </div>
        </div>
    );
} */

    const FeedbackText = ({ feedback }) => (
        <div className="italic text-gray-700">{feedback}</div>
      );
export default FeedbackText;