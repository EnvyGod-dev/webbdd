/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionForm from "../../_components/sendSubmissions/SubmissionForm";
export default function SubmissionCreate() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(() => {
    const data = JSON.parse(localStorage.getItem("lastSubmission"));
    return !!data;
  });

  const handleSubmit = (data) => {
    localStorage.setItem("lastSubmission", JSON.stringify(data));
    setSubmitted(true);
  };

  return (
    <div>
      <SubmissionForm
        readOnly={submitted}
        onSubmit={handleSubmit}
        initialData={{}}
        isEditMode={false}
        showViewSubmissionsButton={submitted}
        onViewSubmissions={() => navigate('/team2/submissions')}
      />
    </div>
  );
}
