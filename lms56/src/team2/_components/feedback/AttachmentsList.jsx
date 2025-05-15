import React from 'react';

const AttachmentsList = ({ attachments }) => {
    if (!attachments || attachments.length === 0) return null;

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Хавсралтууд</h2>
            <div className="space-y-2">
                {attachments.map((file, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-700">{file.name}</span>
                        <span className="ml-2 text-sm text-gray-500">({file.type})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttachmentsList;