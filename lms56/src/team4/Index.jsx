import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import SelectSchool from './pages/SelectSchool';
import Roles from "./pages/Roles";
import UsersList from "./pages/UsersList";
import UserCreate from "./pages/UserCreate";
import UserDetail from "./pages/UserDetail";
import EditUser from "./pages/EditUser";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";

// import RequireAuth from "./components/RequireAuth.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import SchoolAdminDashboard from "./pages/SchoolAdminDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// import Dashboard from "./pages/Dashboard";
import CourseUsersList from "./pages/CourseUsersList";
import CourseUsersEdit from "./pages/CourseUsersEdit";
import CourseGroupsManage from "./pages/CourseGroupsManage";
import CourseGroupUsersList from "./pages/CourseGroupUsersList";  // Corrected import name
import ViewProfile from "./pages/ViewProfile"; 
import UserDashboard from "./pages/UserDashboard.jsx";



const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/schools/current" element={<SelectSchool />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/create" element={<UserCreate />} />
      <Route path="/users/:user_id" element={<UserDetail />} />
      <Route path="/users/:user_id/edit" element={<EditUser />} />
      <Route path="/profile/change-password" element={<ChangePassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/courses/:course_id/users" element={<CourseUsersList />} />
      <Route path="/courses/:course_id/users/edit" element={<CourseUsersEdit />} />
      <Route path="/courses/:course_id/groups/:group_id/users" element={<CourseGroupsManage />} />
      <Route path="/courses/:course_id/groups/:group_id/users" element={<CourseGroupUsersList />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/schooladmin/dashboard" element={<SchoolAdminDashboard />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/profile/view" element={<ViewProfile />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />




    </Routes>
  );
};

export default Index;