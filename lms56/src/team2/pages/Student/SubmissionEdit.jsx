import React from "react";
import { useNavigate } from "react-router-dom";
import SubmissionForm from "../../_components/sendSubmissions/SubmissionForm";
export default function SubmissionEdit() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("lastSubmission")) || {};

  const handleSubmit = (updatedData) => {
    localStorage.setItem("lastSubmission", JSON.stringify(updatedData));
    //navigate("/"); 
    navigate("/team2/submissions");
  };

  return (
    <SubmissionForm
      initialData={data}
      onSubmit={handleSubmit}
    />
  );
}
