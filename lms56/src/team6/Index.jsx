import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard"; // ✅ correct path
import Team6Layout from "./Layout/index"; // ✅ default export
import Exam from "./pages/exam";
import Register from "./pages/register";

const Index = () => {
  return (
    <Routes>
      <Route element={<Team6Layout />}>
        <Route index element={<Navigate to="pages/dashboard" />} />
        <Route path="pages/dashboard" element={<Dashboard />} />
        <Route path="pages/exam" element={<Exam/>}/>
        <Route path="pages/register" element={<Register/>}/>
      </Route>
    </Routes>
  );
};

export default Index;
