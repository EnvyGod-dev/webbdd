import React from "react";
import AssignmentForm from "../../_components/forms/AssignmentForm";

const CreateAssignment = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Шинэ даалгавар үүсгэх
        </h1>
        <AssignmentForm />
      </div>
    </div>
  );
};

export default CreateAssignment;
