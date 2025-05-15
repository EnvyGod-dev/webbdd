import React from "react";
import { Route, Routes } from "react-router-dom";
import Team2Layout from "./_components/Team2Layout";
import SubmissionDashboard from "./pages/Admin/SubmissionDashboard";
import SubmissionDetails from "./pages/Admin/SubmissionDetails";
import AssignmentDetail from "./pages/Student/AssignmentDetail";
import CourseSubmissions from "./pages/Student/CourseSubmissions";
import LessonSubmissions from "./pages/Student/LessonSubmissions";
import SubmissionCreate from "./pages/Student/SubmissionCreate";
import SubmissionEdit from "./pages/Student/SubmissionEdit";
import ViewAssignment from "./pages/Student/ViewAssignment";
import ViewFeedback from "./pages/Student/ViewFeedback";
import CourseDetail from "./pages/Teacher/CourseDetail";
import CourseSubmissionsTeacher from "./pages/Teacher/CourseSubmissionsTeacher";
import CoursesList from "./pages/Teacher/CoursesList";
import CreateAssignment from "./pages/Teacher/CreateAssignment";
import StudentSubmissionPage from "./pages/Teacher/Grade";
import SubmissionComparison from "./pages/Admin/SubmissionComparison";

const Team2 = () => {
  return (
    <Routes>
      <Route element={<Team2Layout />}>
        <Route path="/" element={<ViewAssignment />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/dashboard" element={<SubmissionDashboard />} />
        <Route path="/dashboard/submission/:id" element={<SubmissionDetails />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/submissions" element={<CourseSubmissions />} />
        <Route
          path="/submissions/lesson/submissions"
          element={<LessonSubmissions />}
        />
        <Route path="/dashboard/compare" element={<SubmissionComparison />} />
        <Route
          path="/courses/:courseId/lessons/:lessonId/submit"
          element={<SubmissionCreate />}
        />
        <Route
          path="/courses/:courseId/lessons/:lessonId/edit"
          element={<SubmissionEdit />}
        />
        <Route
          path="/courses/:courseId/submissions"
          element={<CourseSubmissionsTeacher />}
        />
        <Route
          path="/courses/:courseId/submissions/:studentId"
          element={<StudentSubmissionPage />}
        />
        <Route path="/assignments/create" element={<CreateAssignment />} />
        <Route path="/submissions/lesson/submissions/feedback" element={<ViewFeedback />} />
        <Route path="/assignments" element={<AssignmentDetail />} />
      </Route>
    </Routes>
  );
};

export default Team2;
