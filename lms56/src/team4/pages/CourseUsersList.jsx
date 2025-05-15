import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  { id: 1, name: "Batbold", email: "batbold@must.edu.mn" },
  { id: 2, name: "Ankhmaa", email: "ankhmaa@must.edu.mn" },
  { id: 3, name: "Tuvshin", email: "tuvshin@must.edu.mn" },
];

const CourseUsersList = () => {
  const [users, setUsers] = useState(initialUsers);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/team4/courses/123/users/edit`); // example route
  };

  const handleAddUser = () => {
    const name = prompt("Шинэ хэрэглэгчийн нэр:");
    const email = prompt("Имэйл:");
    if (name && email) {
      const newUser = {
        id: Date.now(),
        name,
        email,
      };
      setUsers([...users, newUser]);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">
          Хичээлийн хэрэглэгчийн жагсаалт
        </h1>
        <div className="space-x-2">
          <button
            onClick={handleAddUser}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Хэрэглэгч нэмэх
          </button>
          <button
            onClick={() => navigate("/team4/teacher/dashboard")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Буцах
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">#</th>
              <th className="text-left py-2 px-4 border-b">Нэр</th>
              <th className="text-left py-2 px-4 border-b">Имэйл</th>
              <th className="text-left py-2 px-4 border-b">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{idx + 1}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Засах
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseUsersList;
