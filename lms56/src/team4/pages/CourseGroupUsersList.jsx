import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseGroupUsersList = () => {
  const navigate = useNavigate();

  const handleEditClick = (courseId) => {
    // Navigate to the course user edit page using the courseId
    navigate(`/courses/${courseId}/users/edit`);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Course Group Users List</h1>
      <div className="space-y-4">
        {/* Example User List */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
          <span className="text-lg font-medium">User 1</span>
          <button
            onClick={() => handleEditClick(1)} // Passing course ID for editing user details
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
          <span className="text-lg font-medium">User 2</span>
          <button
            onClick={() => handleEditClick(2)} // Passing course ID for editing user details
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
        {/* Add more users here */}
      </div>
    </div>
  );
};

export default CourseGroupUsersList;
