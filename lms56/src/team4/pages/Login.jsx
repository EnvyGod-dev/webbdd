import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const users = [
    { email: "admin@must.edu.mn", password: "123", role: "admin" },
    { email: "User@must.edu.mn", password: "123", role: "user" },
    { email: "schooladmin@must.edu.mn", password: "123", role: "schooladmin" },
    { email: "schoolteacher@must.edu.mn", password: "123", role: "schoolteacher" },
    { email: "schoolstudent@must.edu.mn", password: "123", role: "schoolstudent" },
    {email: "user@must.edu.mn", password: "123",role: "user"}
    
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.role === role
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
        case "admin":
          navigate("/team4/admin/dashboard");
          break;
        case "schooladmin":
          navigate("/team4/schooladmin/dashboard");
          break;
        case "schoolteacher":
          navigate("/team4/teacher/dashboard");
          break;
        case "schoolstudent":
          navigate("/team4/student/dashboard");
          break;
        case "user":
          navigate("/team4/user/dashboard");
          break;
        default:
          navigate("/team4");
      }
    } else {
      alert("Имэйл, нууц үг эсвэл хэрэглэгчийн төрөл буруу байна.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">-- Хэрэглэгчийн төрөл сонгох --</option>
          <option value="admin">Админ</option>
          <option value="schooladmin">Сургуулийн админ</option>
          <option value="schoolteacher">Багш</option>
          <option value="schoolstudent">Оюутан</option>
          <option value="user">Системийн хэрэглэгч</option> 
        </select>

        <input
          type="email"
          placeholder="Имэйл"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Нууц үг"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Нэвтрэх
        </button>

        <Link
          to="/team4/forgot-password"
          className="block text-center mt-4 text-sm text-blue-600 hover:underline"
        >
          Нууц үгээ мартсан уу?
        </Link>
      </form>
    </div>
  );
};

export default Login;
